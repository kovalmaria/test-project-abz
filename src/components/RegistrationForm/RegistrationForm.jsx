import { useEffect, useState } from 'react';
import './RegistrationForm.scss';
import { getPositions, getToken, postUser } from '../../api';
import { Button } from '../Button/Button';
import successImage from '../../assets/success-image.png';

export const RegistrationForm = ({ onSuccess }) => {
  const [positions, setPositions] = useState([]);
  const [token, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(true);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position_id: null,
    photo: null,
  });
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState('');
  const [showSuccessImage, setShowSuccessImage] = useState(false);


  useEffect(() => {
    getToken().then(setToken).catch(console.error);
    getPositions().then(setPositions).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    const fieldValue = type === 'file' ? files[0] : value;

    setForm(prev => ({
      ...prev,
      [name]: name === 'position_id' ? +fieldValue : fieldValue,
    }));

    if (type === 'file') {
      setFileName(files[0]?.name || "");
    }
    setIsSubmitting(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name || form.name.length < 2 || form.name.length > 60) {
      newErrors.name = 'Name must be 2–60 characters';
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!/^[+]{0,1}380([0-9]{9})$/.test(form.phone)) {
      newErrors.phone = 'Phone must be in format +380XXXXXXXXX';
    }

    if (!form.position_id) {
      newErrors.position_id = 'Please select a position';
    }

    if (!form.photo) {
      newErrors.photo = 'Photo is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await postUser(form, token);
      onSuccess();
      setShowSuccessImage(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        position_id: null,
        photo: null,
      });
      setFileName('');
      setErrors({});

      setTimeout(() => {
        setShowSuccessImage(false);
      }, 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(true);
    }
  };

  return (
    <div className="form-container" id="signup">
      <h1 className="registration-form__title">Working with POST request</h1>

      {showSuccessImage ? (
        <div className="registration-form__success">
          <img
            src={successImage}
            alt="Success"
            className="registration-form__success-image"
          />
        </div>
      ) : 

      <form className="registration-form" onSubmit={handleSubmit}>
  
        <div className="registration-form__field">
          <div className="registration-form__input-wrapper">
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`registration-form__input ${form.name ? 'filled' : ''} ${errors.name ? 'error' : ''}`}
            />
            <label htmlFor="name" className="registration-form__label">Your name</label>
          </div>
          {errors.name && <span className="registration-form__error">{errors.name}</span>}
        </div>
  
        <div className="registration-form__field">
          <div className="registration-form__input-wrapper">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`registration-form__input ${form.email ? 'filled' : ''} ${errors.name ? 'error' : ''}`}
            /> 
            <label className="registration-form__label">Email</label>
          </div>
          {errors.email && <span className="registration-form__error">{errors.email}</span>}
        </div>
  
        <div className="registration-form__field">
          <div className="registration-form__input-wrapper">
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={`registration-form__input ${form.phone ? 'filled' : ''} ${errors.name ? 'error' : ''}`}
            />
            <label className="registration-form__label">Phone</label>
          </div>
          {errors.phone ? (
            <span className="registration-form__error">{errors.phone}</span>
          ) : (
            <p className="registration-form__helper">+38 (XXX) XXX - XX - XX</p>
          )}
        </div>
  
        <fieldset className="registration-form__fieldset">
          <legend className="registration-form__legend">Select your position</legend>
          {positions.map(position => (
            <label key={position.id} className="registration-form__radio">
              <input
                type="radio"
                name="position_id"
                value={position.id}
                checked={form.position_id === position.id}
                onChange={handleChange}
                className='registration-form__radio--input'
              />
              {position.name}
            </label>
          ))}
          {errors.position_id && <span className="registration-form__error">{errors.position_id}</span>}
        </fieldset>
  
        <div className="registration-form__field">
          <label className={`registration-form__file-label ${errors.photo ? 'error' : ''}`}>
            <span className={`registration-form__file-button ${errors.photo ? 'error' : ''}`}>Upload</span>
            <span className="registration-form__file-name">{fileName || 'Upload your photo'}</span>
            <input
              type="file"
              name="photo"
              accept="image/jpeg,image/jpg"
              onChange={handleChange}
            />
          </label>
          {errors.photo && <span className="registration-form__error">{errors.photo}</span>}
        </div>

        <div className="registration-form__submit-button">
          <Button type="submit" disabled={isSubmitting}>
            Sign up
          </Button>
        </div>
      </form>}
  </div>
  )
}
