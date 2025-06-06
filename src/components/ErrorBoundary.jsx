import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
    
    // You can log errors to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {this.props.fallbackTitle || 'Something went wrong'}
            </h1>
            <p className="text-gray-600 mb-6">
              {this.props.fallbackMessage || 
               'We encountered an unexpected error. Please try again later.'}
            </p>
            
            {this.props.showDebug && (
              <details className="mb-6 text-left bg-gray-100 p-3 rounded">
                <summary className="font-medium text-gray-700 cursor-pointer">
                  Error Details
                </summary>
                <div className="mt-2 text-sm text-red-600">
                  <p>{this.state.error?.toString()}</p>
                  <pre className="overflow-x-auto mt-2 p-2 bg-gray-200 rounded">
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              <Link
                to="/"
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors text-center"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallbackTitle: PropTypes.string,
  fallbackMessage: PropTypes.string,
  showDebug: PropTypes.bool,
  onReset: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  showDebug: process.env.NODE_ENV !== 'production',
};

export default ErrorBoundary;