from jose import jwt
from datetime import datetime, timedelta


# secret key
SECRET_KEY = "eyercall_secret_key"

# algorithm
ALGORITHM = "HS256"

# token expire in 
ACCESS_TOKEN_EXPIRE_HOURS = 2

# function to create access token
def create_access_token(data: dict):
    to_encode = data.copy()
    # expiry time 
    expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm= ALGORITHM)