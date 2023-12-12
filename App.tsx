/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface PostData {
  userId: number;
  title: string;
  body: string;
}

const App = () => {
  const [data, setData] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setData(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Post Details</Text>
      </View>

      <View style={styles.detailsContainer}>
        <TouchableOpacity
          style={[styles.button, loading || data ? styles.buttonDisabled : null]}
          onPress={fetchData}
          disabled={loading || data !== null} // Set disabled to true when loading or when data is not null
        >
          <Text style={styles.buttonText}>{loading ? 'Fetching Data...' : data ? 'Data Fetched' : 'Fetch Data'}</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{`Error: ${error.message || 'An unknown error occurred.'}`}</Text>
          </View>
        )}

        {data && (
          <>
            <Text style={styles.label}>User ID:</Text>
            <Text style={styles.value}>{data.userId}</Text>
            <Text style={styles.label}>Title:</Text>
            <Text style={[styles.value, styles.titleText]}>{data.title}</Text>
            <Text style={styles.label}>Body:</Text>
            <Text style={styles.value}>{data.body}</Text>

            <TouchableOpacity style={styles.clearButton} onPress={clearData}>
              <Text style={styles.buttonText}>Clear Data</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 16,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#7f8c8d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  activityIndicator: {
    marginTop: 16,
  },
  errorContainer: {
    marginTop: 16,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  noDataContainer: {
    marginTop: 16,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  titleText: {
    fontSize: 16,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
    alignItems: 'center',
  },
});

export default App;



