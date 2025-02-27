import os
from flask import Flask, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager , UserMixin


# Initialize Flask app
app = Flask(__name__)
BASE_DIRECTORY = os.path.abspath(os.path.dirname(__file__))
DATABASE_PATH = os.path.join(BASE_DIRECTORY, "database", "db.db")
os.makedirs(os.path.dirname(DATABASE_PATH), exist_ok=True)
app.config['SQLALCHEMY_DATABASE_URI']=f'sqlite:///{DATABASE_PATH}'
app.config['SECRET_KEY']='4501232'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db = SQLAlchemy(app)
CORS(app)

loginManager = LoginManager()
loginManager.init_app(app)

class User(UserMixin,db.Model):
    id = db.Column(db.Integer,primary_key=True, autoincrement=True)
    username = db.Column(db.String(200))
    email = db.Column(db.String(200))
    password = db.Column(db.String(200))

@app.route("/")
def cw():
    print("Coursework 1 Work - Terminal")
    return "CW1 APIs"

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
