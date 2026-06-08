import { useState } from 'react';

// ============================================================================
// FORMS BLUEPRINT
// ============================================================================
// This page demonstrates the most common patterns for handling forms in React:
// 1. Controlled inputs (React owns the value)
// 2. Validation logic before submission
// 3. Multiple input types (text, email, password, select, radio, checkbox)
// 4. Showing validation errors inline
// ============================================================================

// ----------- Type for a user registration form --------
type RegistrationForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'user' | 'admin' | 'editor';
  agreeToTerms: boolean;
};

// ----------- Helper: simple email regex validation --------
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function RegistrationFormDemo() {
  // ----------- useState #1: form data --------
  const [form, setForm] = useState<RegistrationForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    agreeToTerms: false,
  });

  // ----------- useState #2: validation errors --------
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationForm, string>>>({});

  // ----------- useState #3: submitted success flag --------
  const [submitted, setSubmitted] = useState(false);

  // ----------- Update a single field without losing the rest --------
  // We spread the existing form (...form) and overwrite only the changed key.
  function updateField<K extends keyof RegistrationForm>(field: K, value: RegistrationForm[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing again
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  // ----------- Validate every field and return true if everything is ok --------
  function validate(): boolean {
    const newErrors: Partial<Record<keyof RegistrationForm, string>> = {};

    if (!form.username.trim()) newErrors.username = 'Username is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!form.password) newErrors.password = 'Password is required';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!form.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ----------- Handle form submission --------
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();        // Stop the browser from reloading the page
    setSubmitted(false);       // Reset success message on each attempt

    if (validate()) {
      setSubmitted(true);
      console.log('Form submitted:', form);
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Registration Form</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Username</label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => updateField('username', e.target.value)}
            className={`w-full bg-gray-800 text-white px-4 py-2 rounded-lg border ${
              errors.username ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:border-indigo-500 transition-colors`}
          />
          {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            className={`w-full bg-gray-800 text-white px-4 py-2 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:border-indigo-500 transition-colors`}
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => updateField('password', e.target.value)}
              className={`w-full bg-gray-800 text-white px-4 py-2 rounded-lg border ${
                errors.password ? 'border-red-500' : 'border-gray-600'
              } focus:outline-none focus:border-indigo-500 transition-colors`}
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Confirm Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              className={`w-full bg-gray-800 text-white px-4 py-2 rounded-lg border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
              } focus:outline-none focus:border-indigo-500 transition-colors`}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Role select */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Role</label>
          <select
            value={form.role}
            onChange={(e) => updateField('role', e.target.value as RegistrationForm['role'])}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="user">User</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Terms checkbox */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.agreeToTerms}
            onChange={(e) => updateField('agreeToTerms', e.target.checked)}
            className="w-5 h-5 accent-indigo-500 cursor-pointer"
          />
          <span className="text-gray-300 text-sm">I agree to the terms and conditions</span>
        </label>
        {errors.agreeToTerms && <p className="text-red-400 text-sm">{errors.agreeToTerms}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
        >
          Register
        </button>

        {/* Success message */}
        {submitted && (
          <p className="text-green-400 font-semibold text-center">Registration successful!</p>
        )}
      </form>
    </div>
  );
}

// ============================================================================
// Login Form (simpler version)
// ============================================================================
function LoginFormDemo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    // Simulate async API call
    setTimeout(() => {
      if (email && password.length >= 4) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 1000);
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Login Form (with async state)</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setStatus('idle'); }}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>

        {status === 'success' && <p className="text-green-400 text-center font-semibold">Login successful!</p>}
        {status === 'error' && <p className="text-red-400 text-center font-semibold">Invalid credentials.</p>}
      </form>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================
export default function FormsBlueprint() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-400 mb-2">Forms Blueprint</h1>
          <p className="text-gray-400">Controlled inputs, validation, and async submission patterns.</p>
        </header>

        <RegistrationFormDemo />
        <LoginFormDemo />
      </div>
    </div>
  );
}
