// Path: components\StoriesBar.jsx
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import StoryItem from './ui/StoryItem';

const StoriesBar = () => {
  const storiesData = useSelector((state) => state.app.stories); 

  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {storiesData.map((story) => (
        <StoryItem key={story.id} story={story} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#a2a2a2',
    height: 100,
    flexGrow: 0,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
});

export default StoriesBar;