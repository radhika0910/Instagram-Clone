// Path: app\(tabs)\search.tsx
import React from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { useFetchPostsQuery } from '../../redux/api/apiSlice';

const SearchScreen = () => {
 
  const { data: postsData, isLoading, isError } = useFetchPostsQuery(1); // Pass a valid argument

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#888" />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <TextInput style={styles.errorText}>Failed to load posts. Please try again later.</TextInput>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Box */}
      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search"
          placeholderTextColor="#888"
        />
      </View>

      {/* Posts Grid */}
      <FlatList
        data={postsData?.photos || []} // Use the fetched posts data
        keyExtractor={(item, index) => `${item.id || index}`}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={styles.postImage} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#888',
  },
  searchBoxContainer: {
    padding: 35,
  },
  searchBox: {
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
  },
  postImage: {
    width: '33.33%',
    aspectRatio: 1,
    margin: 1,
    backgroundColor: '#ffc0cb',
  },
});

export default SearchScreen;