import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

type ArticleType = {
  thumbnail: string;
  link: string;
  companyName: string;
  published: string;
  title: string;
  description: string;
};

type ArticleCardProps = {
  article: ArticleType;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  const [isValidThumbnail, setIsValidThumbnail] = useState(false);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  useEffect(() => {
    const validateImage = async () => {
      if (article.thumbnail) {
        try {
          const response = await fetch(article.thumbnail, { method: 'HEAD' });
          setIsValidThumbnail(response.ok);
        } catch {
          setIsValidThumbnail(false);
        }
      }
    };

    validateImage();
  }, [article.thumbnail]);

  const handlePress = () => {
    Linking.openURL(article.link);
  };

  const formatDate = (dateString: string) => {
    return dateString.slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
  };

  const cleanDescription = (description: string) => {
    return description
      .replace(/<[^>]*>?/gm, '')
      .trim()
      .replace(/&nbsp;/g, ' ')
      .replace(/&#160;/g, '');
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
          <View style={styles.imageContainer}>
            <Image
              source={
                isValidThumbnail && article.thumbnail
                  ? { uri: article.thumbnail }
                  : require('@assets/images/tikitaka-thumbnail.png')
              }
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{article.companyName}</Text>
          <Text style={styles.metaText}>{formatDate(article.published)}</Text>
        </View>

        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
            <Text style={styles.title}>{truncateText(article.title, 48)}</Text>
          </TouchableOpacity>
          <Text style={styles.description}>
            {truncateText(cleanDescription(article.description), 26)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    width: '100%',
  },
  wrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    width: '100%',
  },
  imageContainer: {
    backgroundColor: 'white',
    width: '100%',
    aspectRatio: 336 / 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  metaRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 14,
    color: '#B9B9B9',
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
  },
  title: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    width: '100%',
    fontSize: 16,
    lineHeight: 24,
    color: '#E8E8E8',
  },
});
