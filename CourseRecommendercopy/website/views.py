#blueprint of our application, contains routes (urls defined in it)
from flask import Blueprint, render_template


views = Blueprint('views', __name__,  template_folder='templates')

#route/url to homepage
@views.route('/') #when we enter '/' into url (hit this route) this function runs and we enter homepage


def home():
    
    return render_template('home.html')

"""@views.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    completed = data.get('completed', [])
    recommendations = recommend_courses(completed)
    return jsonify({'recommendations': recommendations})

@views.route('/api/notes', methods=['GET'])
def get_notes():
    notes = Note.query.order_by(Note.date.desc()).all()
    notes_data = []
    for note in notes:
        user = User.query.get(note.user_id)
        notes_data.append({
            'id': note.id,
            'data': note.data,
            'date': note.date.isoformat(),
            'user_id': note.user_id,
            'user_email': user.email if user else None,
            'is_owner': current_user.is_authenticated and note.user_id == current_user.id
        })
    return jsonify({'notes': notes_data})

@views.route('/api/notes', methods=['POST'])
@login_required
def create_note():
    data = request.get_json()
    note_text = data.get('data', '').strip()
    if not note_text:
        return jsonify({'error': 'Note cannot be empty.'}), 400
    note = Note(data=note_text, user_id=current_user.id)
    db.session.add(note)
    db.session.commit()
    return jsonify({'message': 'Note created.', 'note': {
        'id': note.id,
        'data': note.data,
        'date': note.date.isoformat(),
        'user_id': note.user_id,
        'user_email': current_user.email,
        'is_owner': True
    }})

@views.route('/api/notes/<int:note_id>', methods=['PUT'])
@login_required
def update_note(note_id):
    note = Note.query.get_or_404(note_id)
    if note.user_id != current_user.id:
        return jsonify({'error': 'Permission denied.'}), 403
    data = request.get_json()
    note_text = data.get('data', '').strip()
    if not note_text:
        return jsonify({'error': 'Note cannot be empty.'}), 400
    note.data = note_text
    db.session.commit()
    return jsonify({'message': 'Note updated.'})

@views.route('/api/notes/<int:note_id>', methods=['DELETE'])
@login_required
def delete_note(note_id):
    note = Note.query.get_or_404(note_id)
    if note.user_id != current_user.id:
        return jsonify({'error': 'Permission denied.'}), 403
    db.session.delete(note)
    db.session.commit()
    return jsonify({'message': 'Note deleted.'})
"""