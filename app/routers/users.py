from fastapi import Depends, FastAPI, APIRouter
from dependencies import *
from models import pgsql


import traceback
router = APIRouter()
@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    print(user)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post('/register', response_model=Response)
async def register(form_data: User): 
    if len(await pgsql.check_register(form_data.userId)) !=0:
        print(123)
        return {'code':401,'message':'当前用户Id已存在','data':{}}
    try:
        await pgsql.register(form_data.userId,form_data.username,form_data.password)
        return {'code':200,'message':'注册成功','data':{'userId':form_data.userId, 'username':form_data.username}}
    except:
        traceback.print_exc()
        return {'code':500,'message':'未知错误！','data':{}}

# @router.get("/users/me/", response_model=User)
# async def read_users_me(current_user: User = Depends(get_current_active_user)):
#     return current_user

# @router.get("/users/me/items/")
# async def read_own_items(current_user: User = Depends(get_current_active_user)):
#     return [{"item_id": "Foo", "owner": current_user.username}]