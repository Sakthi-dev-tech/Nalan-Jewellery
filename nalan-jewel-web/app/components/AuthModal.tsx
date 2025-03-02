import { Dispatch, SetStateAction, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { SignInSignUpLogic } from "../functions/SignUpSignInLogic";

export const AuthModal = ({ isOpen, onClose, type, setShowSignInModal, setShowSignUpModal }: { isOpen: boolean; onClose: () => void; type: 'signup' | 'signin' | 'agent'; setShowSignInModal: Dispatch<SetStateAction<boolean>>, setShowSignUpModal: Dispatch<SetStateAction<boolean>> }) => {
    if (!isOpen) return null;

    const [modalEmail, setModalEmail] = useState('');
    const [modalPassword, setModalPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl p-6 w-[400px] relative"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <i className="material-icons">close</i>
          </button>

          <h2 className="text-2xl font-semibold mb-6">
            {type === 'signup' ? 'Create Account' : type === 'signin' ? 'Welcome Back' : 'Agent Sign In'}
          </h2>

          {type !== 'agent' && (
            <>
              <button className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors" onClick={async () => {
                const { data, error } = await new SignInSignUpLogic().SignInUsingFacebook();
                console.log(data, error);
              }}>
                <img src='/facebook-icon.svg' className="w-5 h-5" />
                <span>Continue with Facebook</span>
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>
            </>
          )}

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                value={modalEmail}
                onChange={(e) => setModalEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34758f] bg-white"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={modalPassword}
                onChange={(e) => setModalPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34758f] bg-white"
                placeholder="Enter your password"
              />
            </div>

            {type === 'signin' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`remember-${type}`}
                    className="accent-[#34758f] w-4 h-4 rounded border-gray-300 bg-white"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor={`remember-${type}`} className="ml-2 text-sm text-gray-600" >
                    Remember me
                  </label>
                </div>
                <button type="button" className="text-sm text-[#34758f] hover:text-[#116c96]">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#34758f] text-white rounded-lg hover:bg-[#116c96] transition-colors"
              onClick={async (e) => {
                e.preventDefault(); // Prevent form submission
                if (type === 'signup') {
                  const { data, error } = await new SignInSignUpLogic().SignUpUsingEmail(modalEmail, modalPassword);
                  console.log(data, error);
                } else if (type === 'signin') {
                  const { data, error } = await new SignInSignUpLogic().SignInUsingEmail(
                    modalEmail,
                    modalPassword,
                    rememberMe
                  );
                  if (!error && data) {
                    onClose(); // Close the modal on successful login
                  }
                  console.log(data, error);
                }
              }}
            >
              {type === 'signup' ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          {type === 'signup' && (
            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => {
                  onClose();
                  setShowSignInModal(true);
                }}
                className="text-[#34758f] hover:text-[#116c96]"
              >
                Sign in
              </button>
            </p>
          )}

          {type === 'signin' && (
            <p className="mt-4 text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  onClose();
                  setShowSignUpModal(true);
                }}
                className="text-[#34758f] hover:text-[#116c96]"
              >
                Sign up
              </button>
            </p>
          )}
        </motion.div>
      </div>
    );
  };