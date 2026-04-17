from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated= "auto"
)


# function for hash password
def hash_password(password: str):
    password = password[:72]
    return pwd_context.hash(password)


# function for verify password
def verfy_password(plain_password : str, hashed_password : str):
    plain_password = plain_password[:72]
    return pwd_context.verify(plain_password, hashed_password)