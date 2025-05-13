// Path: app\splash.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setPosts, setProfilePicture, setStories, setVideos } from '../redux/actions/appActions';
import {
  useFetchPostsQuery,
  useFetchProfilePictureQuery,
  useFetchStoriesQuery,
} from '../redux/api/apiSlice';

const SplashScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: postsData } = useFetchPostsQuery(12); 
  const { data: profileData } = useFetchProfilePictureQuery(12); 
  const { data: storiesData } = useFetchStoriesQuery(12);
  // const { data: videosData } = useFetchVideosQuery(12); 

  useEffect(() => {
    if (postsData?.success) {
      const formattedPosts = postsData.photos.map((photo: { url: any; }, index: number) => ({
        id: `${index + 1}`,
        imageUrl: photo.url,
        user: `user_${index + 1}`,
        caption: 'Sample caption',
        likes: Math.floor(Math.random() * 100),
        comments: [],
      }));
      dispatch(setPosts(formattedPosts));
    }

    if (profileData?.success) {
      dispatch(setProfilePicture(profileData.photos[0].url));
    }

    if (storiesData?.success) {
  const stories = [
    {
      id: 'your',
      imageUrl: require('@/assets/user_profile.jpg'),
      isYourStory: true,
    },
    ...storiesData.photos.map((photo: { url: any }, index: number) => ({
      id: `user${index + 1}`,
      imageUrl: photo.url,
      isYourStory: false,
    })),
  ];
  dispatch(setStories(stories));
  console.log('Stories:', stories);
}

    if (videosData) {
      dispatch(setVideos(videosData));
    }

    setTimeout(() => {
      router.replace('/(tabs)');
    }, 2000);
  }, [postsData, profileData, storiesData, videosData, dispatch, router]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/instagram_logo.jpg')} style={styles.logo} />
      <Text style={styles.appName}>My App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SplashScreen;