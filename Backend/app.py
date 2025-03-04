import os
from flask import Flask, request, jsonify, redirect, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager , UserMixin, login_required
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash

load_dotenv()

# Initialize Flask app
app = Flask(__name__)
BASE_DIRECTORY = os.path.abspath(os.path.dirname(__file__))
DATABASE_PATH = os.path.join(BASE_DIRECTORY, "database", "db.db")
os.makedirs(os.path.dirname(DATABASE_PATH), exist_ok=True)
app.config['SQLALCHEMY_DATABASE_URI']=f'sqlite:///{DATABASE_PATH}'
app.config['SECRET_KEY']=os.getenv("BE_SECRET_KEY", "default")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db = SQLAlchemy(app)
CORS(app)

loginManager = LoginManager()
loginManager.init_app(app)
loginManager.login_view = "login"

#User class for saving the user info
class User(UserMixin,db.Model):
    id = db.Column(db.Integer,primary_key=True, autoincrement=True)
    username = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

@loginManager.user_loader
def get(id):
    return User.query.get(id)

#register a new user with username | email | password
@app.route("/register", methods=["POST"])
def register():
    
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not(username and password and email):
        return jsonify({"error": "All fields are required"}), 400
    
    existingUser = User.query.filter_by(email=email).first()
    if existingUser:
        return jsonify({"error": "This user already exists"}), 400
    
    hashedPW = generate_password_hash(password)

    newUser = User(username=username, email=email, password=hashedPW)
    db.session.add(newUser)
    db.session.commit()

    return jsonify({
        "message":"New user has registered Successfully",
        "redirect": "/login"
        }), 201


@app.route("/", methods=['GET'])
@login_required
def cw():
    print("Coursework 1 Work - Terminal")
    return "CW1 APIs"

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
