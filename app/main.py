from routers import users
from fastapi import FastAPI
from routers import users, items, search
from models import pgsql
import dependencies
import uvicorn
from fastapi.staticfiles import StaticFiles
app = FastAPI()
app.include_router(users.router)
app.include_router(search.router)
app.add_exception_handler(dependencies.ErrorOwn,dependencies.unicorn_exception_handler)
app.mount("/image", StaticFiles(directory="image"), name="image")
# app.exception_handler(dependencies.UnicornException)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
