FROM python:3.10

# Set base working directory
WORKDIR /app

# Upgrade pip
RUN pip install --upgrade pip

# Copy the entire teams_module into the image
COPY ./teams_module ./teams_module

# Copy the entire tasks_module into the image
COPY ./business_module ./business_module

# Install teams_module dependencies (optional but helpful)
WORKDIR /app/teams_module
RUN pip install -r requirements.txt || true
RUN pip install -e .

# Install tasks_module dependencies
WORKDIR /app/business_module
RUN pip install -r requirements.txt

# Expose the port used by the Django server
EXPOSE 8002

# Start the server in tasks_module
WORKDIR /app/business_module
CMD ["python", "manage.py", "runserver", "0.0.0.0:8002"]
