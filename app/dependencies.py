from fastapi import Header, HTTPException
from datetime import datetime, timedelta
from typing import Union
from models import pgsql
from fastapi import Depends, FastAPI, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from fastapi.responses import JSONResponse
# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "userId": '123',
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$FRJ8M0HkMJPH8woZXG7ddONPVSrPUp3amEXTwvpAiLc8tdt5S2vb2",
        "disabled": False,
    }
}
class ErrorOwn(Exception):
    def __init__(self, msg: str):
        self.msg = msg

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Union[str, None] = None


class User(BaseModel):
    userId : str
    username: Union[str, None] = None
    password: Union[str, None] = None

class Response(BaseModel):
    code: int 
    message: str
    data: dict

class UserInDB(User):
    hashed_password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def unicorn_exception_handler(request: Request, exc: ErrorOwn):
    return JSONResponse(
        status_code=418,
        content={'code':418,'massage':'token认证失败','data':{}},
    )

async def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
    
def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    print(token)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail={"a":'asd'},
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(payload)
        userId: str = payload.get("sub")
        if userId is None:
            raise credentials_exception
    except JWTError:
        raise ErrorOwn(msg="123123")
    user =await pgsql.jwt_get_info(userId)
    if len(user) == 0:
        raise credentials_exception
    return {'userId':userId,'username':user[0].get('username')}


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    # if current_user.disabled:
    #     raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

