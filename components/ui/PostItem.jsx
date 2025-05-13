// Path: components\ui\PostItem.jsx
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFetchAvatarImageQuery, useFetchPostImageQuery } from '../../redux/api/apiSlice';

const PostItem = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);

  // Fetch a unique post image using the post ID
  const { data: postImageData } = useFetchPostImageQuery(post.id);
  const postImageUrl = postImageData?.success ? postImageData.photos[0].url : post.imageUrl;

  // Fetch a unique avatar image using the post ID
  const { data: avatarImageData } = useFetchAvatarImageQuery(post.id);
  const avatarImageUrl = avatarImageData?.success ? avatarImageData.photos[0].url : '';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: avatarImageUrl }} style={styles.avatar} />
        <Text style={styles.username}>{post.user}</Text>
        <TouchableOpacity style={styles.options}>
          <Icon name="more-horizontal" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image source={{ uri: postImageUrl }} style={styles.image} resizeMode="cover" />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.interactions}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setIsLiked(!isLiked)}
          >
            <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={24} color={isLiked ? 'red' : 'black'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <Icon name="message-circle" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Icon name="send" size={24} color="black" />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableOpacity style={styles.icon}>
              <Icon name="bookmark" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.likes}>{post.likes} likes</Text>
        <Text style={styles.caption}>
          <Text style={{ fontWeight: 'bold' }}>{post.user} </Text>
          {post.caption}
        </Text>
        {post.comments && post.comments.length > 0 && (
          <TouchableOpacity onPress={() => console.log('View all comments')}>
            <Text style={styles.viewComments}>View all {post.comments.length} comments</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  username: {
    fontWeight: 'bold',
  },
  options: {
    marginLeft: 'auto',
  },
  image: {
    width: '100%',
    height: 400,
    backgroundColor: '#ffc0cb',
  },
  footer: {
    padding: 10,
  },
  interactions: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  likes: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caption: {
    lineHeight: 18,
    marginBottom: 5,
  },
  viewComments: {
    color: 'gray',
  },
});

export default PostItem;