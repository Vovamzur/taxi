import React, { PureComponent, ErrorInfo } from 'react';
import './styles.module.scss';

interface IState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  hasError: boolean;
}

class ErrorBoundary extends PureComponent<{}, IState> {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-container">
          <div className="error-main">
            <h2 className="error-title">Aaaah! Something went wrong !</h2>
            <p className="error-description">
              Brace yourself till we get the error fixed. You may also refresh
              the page or try again later
						</p>
            <details className="error-details">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
};

export default ErrorBoundary;
