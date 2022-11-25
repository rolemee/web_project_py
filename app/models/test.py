import os
from fastapi import Depends, FastAPI, APIRouter
router = APIRouter()
@router.get('/test')
def test():
    print(os.getcwd())
    return '123'
print(4)