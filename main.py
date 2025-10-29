#importing website package to create new application
#since website is a package we can run everythin inside like in __init__.py
from website import create_app

app = create_app()

if __name__ == '__main__': #only if this file is ran does the next line run
    app.run(debug=True) #runs flask app!

