from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(500), nullable=False)
    phone_number = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Analysis(db.Model):
    __tablename__ = 'analyses'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    image_path = db.Column(db.String(500))
    analysis_status = db.Column(db.String(50))
    isic_validation = db.Column(db.Boolean)
    condition = db.Column(db.String(100))
    confidence = db.Column(db.Numeric(5, 2))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    user = db.relationship('User', backref=db.backref('analyses', lazy=True))

class Report(db.Model):
    __tablename__ = 'reports'
    id = db.Column(db.Integer, primary_key=True)
    analysis_id = db.Column(db.Integer, db.ForeignKey('analyses.id'))
    report_content = db.Column(db.Text)
    pdf_path = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    analysis = db.relationship('Analysis', backref=db.backref('report', uselist=False))

class EmailQueue(db.Model):
    __tablename__ = 'email_queue'
    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.Integer, db.ForeignKey('reports.id'))
    user_email = db.Column(db.String(255))
    sent_status = db.Column(db.Boolean, default=False)
    scheduled_time = db.Column(db.DateTime)
    sent_at = db.Column(db.DateTime)
    report = db.relationship('Report', backref=db.backref('email_queue', uselist=False))
