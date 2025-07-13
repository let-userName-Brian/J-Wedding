import { useState } from 'react'
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSignedUp, setIsSignedUp] = useState(false)
  const [formData, setFormData] = useState({
    partyName: '',
    guestCount: '',
    phoneNumber: ''
  })

  const handleSignUp = () => {
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      await fetch('https://hook.us2.make.com/bhcokqllt3uuklurrh3oe6igimoyas1t', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setIsSignedUp(true);
      setIsModalOpen(false);
    } catch (error) {
      alert('There was an error submitting your RSVP. Please try again.');
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="app">
      <div className="split-layout">
        {/* Hero Section with Background Image */}
        <section className="hero" style={{ backgroundImage: "url('/IMG_3118.JPG.jpeg')" }}>
          <div className="hero-content">
            <h1 className="hero-title">AJ & Jessica</h1>
            <p className="hero-subtitle">Formally invite you to their wedding celebration</p>
          </div>
          <div className="scroll-down-indicator">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="8,12 16,20 24,12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>
              <polyline points="8,18 16,26 24,18" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
            </svg>
          </div>
        </section>

        {/* Details Panel */}
        <footer className="details-panel">
          <div className="detail-list">
            <div className="detail-row">
              <div className="detail-label">When</div>
              <div className="detail-value">Saturday, October 25, 2025<br/>4:00 PM</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Where</div>
              <div className="detail-value">Gloria's<br/>110 Clopine Lake Rd<br/>Fort Valley, GA 31030</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Attire</div>
              <div className="detail-value">Black Tie<br/>(Suits for men, formal evening gowns for women)</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">What's for Dinner?</div>
              <div className="detail-value">Tacos (corn or flour)<br/>Meat: Birria, Chicken, Ground Beef<br/>Vegan options available</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Drinks</div>
              <div className="detail-value">Sweet tea, lemonade, water<br/>Cash bar for alcoholic beverages</div>
            </div>
          </div>
          <div className="rsvp-row">
            <div className="detail-label">Let us know you're coming!</div>
            <div className="detail-value">Please RSVP by September 15th, 2025</div>
            <button 
              className="signup-button"
              onClick={handleSignUp}
              disabled={isSignedUp}
            >
              {isSignedUp ? 'Thank You!' : 'RSVP'}
            </button>
          </div>
        </footer>
      </div>

      {/* RSVP Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            
            <h2 className="modal-title">RSVP</h2>
            <p className="modal-subtitle">Please provide your details below</p>
            
            <form onSubmit={handleSubmit} className="rsvp-form">
              <div className="form-group">
                <label htmlFor="partyName">Party Name *</label>
                <input
                  type="text"
                  id="partyName"
                  name="partyName"
                  value={formData.partyName}
                  onChange={handleInputChange}
                  placeholder="e.g., The Smith Family"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="guestCount">Number of Guests (including you) *</label>
                <input
                  type="number"
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  min={1}
                  max={20}
                  placeholder="e.g., 2"
                  required
                  onKeyDown={e => {
                    if (["e", "E", "+", "-", "."].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onInput={e => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^0-9]/g, '');
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  required
                  inputMode="tel"
                  pattern="[0-9()+\- ]*"
                  maxLength={20}
                  onInput={e => {
                    const input = e.target as HTMLInputElement;
                    let digits = input.value.replace(/\D/g, '');
                    let formatted = '';
                    if (digits.length > 0) {
                      formatted = '(' + digits.substring(0, 3);
                    }
                    if (digits.length >= 4) {
                      formatted += ') ' + digits.substring(3, 6);
                    }
                    if (digits.length >= 7) {
                      formatted += '-' + digits.substring(6, 10);
                    }
                    input.value = formatted;
                  }}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Submit RSVP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App