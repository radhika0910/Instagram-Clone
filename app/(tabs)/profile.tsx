// Path: app\(tabs)\profile.tsx
import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setGridImages } from '../../redux/actions/appActions';
import { useFetchGridImagesQuery } from '../../redux/api/apiSlice';
import { RootState } from '../../redux/store'; // Correctly import RootState

// Create a typed version of useSelector
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const profilePicture = useSelector((state: { app: { profilePicture: string } }) => state.app.profilePicture);


  // Fetch grid images using RTK Query
  const { data: gridData, isLoading, isError } = useFetchGridImagesQuery(6);

  // Access grid images from Redux
  const gridImages = useTypedSelector((state) => state.app.gridImages);

  useEffect(() => {
    if (gridData?.success) {
      const formattedGridImages = gridData.photos.map((photo: { url: any; }, index: number) => ({
        id: `${index + 1}`,
        imageUrl: photo.url,
      }));
      dispatch(setGridImages(formattedGridImages)); // Store grid images in Redux
    }
  }, [gridData, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.username}>username</Text>
      </View>

      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: profilePicture || 'https://via.placeholder.com/100' }}
          style={styles.profilePicture}
        />
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>120</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>150</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editProfileButton}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Grid Images */}
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : isError ? (
        <Text style={styles.errorText}>Failed to load images.</Text>
      ) : (
        <FlatList
          data={gridImages}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  editProfileButton: {
    margin: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postImage: {
    width: '33.33%',
    aspectRatio: 1,
    margin: 1,
    backgroundColor: '#ffc0cb',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});

export default ProfileScreen;