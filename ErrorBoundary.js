import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
      super(props);
      this.state = { hasError: false };
  }

  styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 30
    }
  })

  static getDerivedStateFromError (error) {
    return { hasError: true }
  }

  componentDidCatch (error, errorInfo) {
    // you can log the error from here
  }

  render () {
    return this.state.hasError
      ? <View style={this.styles.container}><Text style={this.styles.errorText}>oops!</Text></View>
      : this.props.children
  }
}

export default ErrorBoundary;