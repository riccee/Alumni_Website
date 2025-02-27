FROM python:3.13

WORKDIR /app

ENV PYTHONPATH=/app/app

RUN pip install --no-cache-dir --upgrade pip

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

EXPOSE 8000
#CMD ["gunicorn", "app.main:app", "-k", "uvicorn.workers.UvicornWorker", \
#    "--bind", "0.0.0.0:8000", "--workers", "4"]
CMD ["fastapi", "run", "app/main.py", "--port", "8000", "--proxy-headers"]