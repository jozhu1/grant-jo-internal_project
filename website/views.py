#blueprint of our application, contains routes (urls defined in it)
from flask import Blueprint, render_template


views = Blueprint('views', __name__,  template_folder='templates')

#route/url to homepage
@views.route('/') #when we enter '/' into url (hit this route) this function runs and we enter homepage
def home():
    return render_template('home.html')


