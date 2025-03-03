from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr
from pathlib import Path
from jinja2 import Environment, select_autoescape, FileSystemLoader
from app.core.config import settings

# Email configuration
conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    TEMPLATE_FOLDER=Path(__file__).parent.parent / 'templates'
)

# Initialize FastMail
fastmail = FastMail(conf)

# Setup Jinja2 template environment
template_env = Environment(
    loader=FileSystemLoader('app/templates'),
    autoescape=select_autoescape(['html', 'xml'])
)

async def send_password_reset_email(email: EmailStr, token: str):
    """Send password reset email with reset token"""
    # Generate reset link
    reset_link = f"{settings.FRONTEND_URL}/reset-password?token={token}"
    
    # Get the template
    template = template_env.get_template('password_reset.html')
    
    # Render the template with context
    html_content = template.render(
        reset_link=reset_link
    )
    
    # Create message schema
    message = MessageSchema(
        subject="Password Reset Request - The AMHS Alumni Team",
        recipients=[email],
        body=html_content,
        subtype="html"
    )
    
    # Send email
    await fastmail.send_message(message)

async def send_password_reset_confirmation(email: EmailStr):
    """Send confirmation email after password has been reset"""
    template = template_env.get_template('password_reset_confirmation.html')
    
    html_content = template.render() 
    
    message = MessageSchema(
        subject="Password Reset Successful - The AMHS Alumni Team",
        recipients=[email],
        body=html_content,
        subtype="html"
    )
    
    await fastmail.send_message(message)