// Path: app\(tabs)\search.tsx
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';

const SearchScreen = () => {
  const postsData = useSelector((state: { app: { posts: { id: string; imageUrl: string }[] } }) => state.app.posts); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search"
          placeholderTextColor="#888"
        />
      </View>

      <FlatList
        data={postsData}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
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