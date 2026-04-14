from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated= "auto"
)


# function for hash password
def hash_password(password: str):
    return pwd_context.hash(password)


# function for verify password
def verfy_password(plain, hashed):
    return pwd_context.verify(plain, hashed)