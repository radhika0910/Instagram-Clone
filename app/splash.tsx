// Path: app\splash.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setPosts, setProfilePicture, setStories, setVideos } from '../redux/actions/appActions';

// Define the type for the API response
type Photo = {
  id: number;
  url: string;
};

const SplashScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Fetch posts
        const postsResponse = await fetch('https://boringapi.com/api/v1/photos/random?num=10');
        const postsData = await postsResponse.json();
        if (postsData.success) {
          const formattedPosts = postsData.photos.map((photo: Photo, index: number) => ({
            id: `${index + 1}`,
            imageUrl: photo.url,
            user: `user_${index + 1}`,
            caption: 'Sample caption',
            likes: Math.floor(Math.random() * 100),
            comments: [],
          }));
          dispatch(setPosts(formattedPosts));
        }

        // Fetch profile picture
        const profileResponse = await fetch('https://boringapi.com/api/v1/photos/random?num=1');
        const profileData = await profileResponse.json();
        if (profileData.success) {
          dispatch(setProfilePicture(profileData.photos[0].url));
        }

        // Fetch videos
        const videosResponse = await fetch(
          'https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json'
        );
        const videosData = await videosResponse.json();
        dispatch(setVideos(videosData));

        // Fetch stories
        const stories = [
          { id: 'your', imageUrl: require('@/assets/user_profile.jpg'), isYourStory: true },
        ];

        for (let i = 1; i <= 12; i++) {
          const response = await fetch('https://boringapi.com/api/v1/photos/random?num=1');
          const data = await response.json();
          if (data.success && data.photos.length > 0) {
            stories.push({
              id: `user${i}`, imageUrl: data.photos[0].url,
              isYourStory: false
            });
          } else {
            // Use a fallback image if the API response is invalid
            stories.push({
              id: `user${i}`, imageUrl: 'https://via.placeholder.com/150',
              isYourStory: false
            });
          }
        }

        dispatch(setStories(stories));

        // Simulate a delay for the splash screen
        setTimeout(() => {
          router.replace('/(tabs)'); // Navigate to the main tabs screen
        }, 2000);
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, [dispatch, router]);

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