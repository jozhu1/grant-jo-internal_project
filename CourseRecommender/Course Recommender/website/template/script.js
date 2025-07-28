// Course recommendation functionality
class CourseRecommender {
  constructor() {
    this.selectedCourses = [];
    this.initializeElements();
    this.bindEvents();
  }

  initializeElements() {
    this.courseInput = document.getElementById('courseInput');
    this.addCourseBtn = document.getElementById('addCourseBtn');
    this.courseTags = document.getElementById('courseTags');
    this.getRecommendationsBtn = document.getElementById('getRecommendationsBtn');
    this.loadingSpinner = document.getElementById('loadingSpinner');
    this.recommendationsContainer = document.getElementById('recommendationsContainer');
    this.recommendationsList = document.getElementById('recommendationsList');
    this.errorMessage = document.getElementById('errorMessage');
  }

  bindEvents() {
    this.addCourseBtn.addEventListener('click', () => this.addCourse());
    this.courseInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addCourse();
      }
    });
    this.getRecommendationsBtn.addEventListener('click', () => this.getRecommendations());
  }

  addCourse() {
    const courseCode = this.courseInput.value.trim().toUpperCase();
    
    if (!courseCode) {
      this.showError('Please enter a course code');
      return;
    }

    if (this.selectedCourses.includes(courseCode)) {
      this.showError('Course already added');
      return;
    }

    this.selectedCourses.push(courseCode);
    this.renderCourseTags();
    this.courseInput.value = '';
    this.updateRecommendButton();
    this.hideError();
  }

  removeCourse(courseCode) {
    this.selectedCourses = this.selectedCourses.filter(course => course !== courseCode);
    this.renderCourseTags();
    this.updateRecommendButton();
  }

  renderCourseTags() {
    this.courseTags.innerHTML = '';
    
    this.selectedCourses.forEach(course => {
      const tag = document.createElement('div');
      tag.className = 'course-tag';
      tag.innerHTML = `
        <span>${course}</span>
        <button class="remove-course-btn" onclick="courseRecommender.removeCourse('${course}')">&times;</button>
      `;
      this.courseTags.appendChild(tag);
    });
  }

  updateRecommendButton() {
    this.getRecommendationsBtn.disabled = this.selectedCourses.length === 0;
  }

  async getRecommendations() {
    if (this.selectedCourses.length === 0) {
      this.showError('Please add at least one course');
      return;
    }
    this.showLoading();
    this.hideError();
    this.hideRecommendations();
    try {
      const response = await fetch('/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: this.selectedCourses
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.displayRecommendations(data.recommendations || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      this.showError('Failed to get recommendations. Please make sure the backend server is running.');
    } finally {
      this.hideLoading();
    }
  }

  displayRecommendations(recommendations) {
    this.recommendationsList.innerHTML = '';
    
    if (recommendations.length === 0) {
      this.recommendationsList.innerHTML = '<li>No courses available for recommendation based on your completed courses.</li>';
    } else {
      recommendations.forEach(course => {
        const li = document.createElement('li');
        li.textContent = course;
        this.recommendationsList.appendChild(li);
      });
    }
    
    this.recommendationsContainer.style.display = 'block';
  }

  showLoading() {
    this.loadingSpinner.style.display = 'block';
    this.getRecommendationsBtn.disabled = true;
  }

  hideLoading() {
    this.loadingSpinner.style.display = 'none';
    this.updateRecommendButton();
  }

  showError(message) {
    this.errorMessage.textContent = message;
    this.errorMessage.style.display = 'block';
  }

  hideError() {
    this.errorMessage.style.display = 'none';
  }

  hideRecommendations() {
    this.recommendationsContainer.style.display = 'none';
  }
}

// Utility: Check login status
async function checkLoginStatus() {
  try {
    const res = await fetch('/');
    const text = await res.text();
    // If the response contains 'Log Out' or 'Logout', user is logged in
    return text.includes('Log Out') || text.includes('Logout');
  } catch {
    return false;
  }
}

function showLoginGate() {
  document.getElementById('mainContent').style.display = 'none';
  document.getElementById('loginGate').style.display = 'block';
  document.getElementById('loginBtn').style.display = '';
  document.getElementById('logoutBtn').style.display = 'none';
}

function showMainContent() {
  document.getElementById('mainContent').style.display = '';
  document.getElementById('loginGate').style.display = 'none';
  document.getElementById('loginBtn').style.display = 'none';
  document.getElementById('logoutBtn').style.display = '';
}

// Notes logic
async function fetchNotes() {
  const res = await fetch('/api/notes');
  const data = await res.json();
  renderNotes(data.notes || []);
}

function renderNotes(notes) {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = '';
  notes.forEach(note => {
    const div = document.createElement('div');
    div.className = 'note-item';
    div.innerHTML = `
      <div><b>${note.user_email || 'Unknown'}:</b> <span class="note-content">${note.data}</span></div>
      <div style="font-size:0.9em;color:#888;">${new Date(note.date).toLocaleString()}</div>
      <div>
        ${note.is_owner ? `<button class="edit-note-btn" data-id="${note.id}">Edit</button> <button class="delete-note-btn" data-id="${note.id}">Delete</button>` : ''}
      </div>
      <hr>
    `;
    notesList.appendChild(div);
  });
  // Attach event listeners for edit/delete
  document.querySelectorAll('.delete-note-btn').forEach(btn => {
    btn.onclick = async (e) => {
      const id = btn.getAttribute('data-id');
      await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      fetchNotes();
    };
  });
  document.querySelectorAll('.edit-note-btn').forEach(btn => {
    btn.onclick = (e) => {
      const id = btn.getAttribute('data-id');
      const noteDiv = btn.closest('.note-item');
      const contentSpan = noteDiv.querySelector('.note-content');
      const oldText = contentSpan.textContent;
      const textarea = document.createElement('textarea');
      textarea.value = oldText;
      contentSpan.replaceWith(textarea);
      btn.textContent = 'Save';
      btn.onclick = async () => {
        const newText = textarea.value.trim();
        if (!newText) return alert('Note cannot be empty.');
        await fetch(`/api/notes/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: newText })
        });
        fetchNotes();
      };
    };
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  // Login gating
  const loggedIn = await checkLoginStatus();
  if (loggedIn) {
    showMainContent();
    fetchNotes();
  } else {
    showLoginGate();
  }

  // Login/Logout/Signup button logic
  document.getElementById('loginBtn').onclick = () => window.location.href = '/login';
  document.getElementById('logoutBtn').onclick = () => window.location.href = '/logout';
  document.getElementById('showLogin').onclick = () => window.location.href = '/login';
  document.getElementById('showSignup').onclick = () => window.location.href = '/sign-up';

  // Notes form
  const noteForm = document.getElementById('noteForm');
  if (noteForm) {
    noteForm.onsubmit = async (e) => {
      e.preventDefault();
      const noteInput = document.getElementById('noteInput');
      const text = noteInput.value.trim();
      if (!text) return;
      await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: text })
      });
      noteInput.value = '';
      fetchNotes();
    };
  }

  // Course recommender
  window.courseRecommender = new CourseRecommender();
}); 