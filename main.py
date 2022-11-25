import os
import sys

from fastapi import FastAPI
from app.routers import users, items
app = FastAPI()
app.include_router(users.router)