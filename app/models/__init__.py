from models import pgsql

async def main():
    pgsql.init()

if __name__ == "__main__":
    main()