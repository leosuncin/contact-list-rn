import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { NativeModules, Platform, StyleSheet, View } from 'react-native';
import {
  Card,
  Divider,
  FAB,
  Paragraph,
  Portal,
  Title,
} from 'react-native-paper';
import { RootStackParams } from 'types/RootStackParams';

type ShowContactProps = {
  navigation: StackNavigationProp<RootStackParams, 'ListContact'>;
  route: RouteProp<RootStackParams, 'ShowContact'>;
};

const ShowContact: React.FC<ShowContactProps> = props => {
  const contact = props.route.params.contact;
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.screen}>
      <Card>
        <Card.Content>
          <Title>Basic information</Title>
          <Paragraph>Full name: {contact.name}</Paragraph>
          <Paragraph>Username: {contact.username}</Paragraph>
          <Paragraph>e-mail: {contact.email}</Paragraph>
          <Paragraph>Phone number: {contact.phone}</Paragraph>
          <Paragraph>Website: {contact.website}</Paragraph>
          <Divider style={styles.divider} />
          <Title>Address</Title>
          <Paragraph>Street: {contact.address.street}</Paragraph>
          <Paragraph>Suite: {contact.address.suite}</Paragraph>
          <Paragraph>City: {contact.address.city}</Paragraph>
          <Paragraph>Zip code: {contact.address.zipcode}</Paragraph>
          <Paragraph>
            Position: ({contact.address.geo.lat}, {contact.address.geo.lng})
          </Paragraph>
          <Divider style={styles.divider} />
          <Title>Company</Title>
          <Paragraph>Name: {contact.company.name}</Paragraph>
          <Paragraph>Catch phrase: {contact.company.catchPhrase}</Paragraph>
          <Paragraph>Business: {contact.company.bs}</Paragraph>
        </Card.Content>
      </Card>
      <Portal>
        <FAB.Group
          visible
          icon="account-circle"
          style={styles.fab}
          open={open}
          actions={[
            { icon: 'delete', label: 'Remove contact', onPress() {} },
            { icon: 'pencil', label: 'Edit contact', onPress() {} },
          ]}
          onStateChange={({ open }) => setOpen(open)}
        />
      </Portal>
    </View>
  );
};

export default ShowContact;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: Platform.OS === 'ios' ? 25 : NativeModules.StatusBarManager.HEIGHT,
  },
  divider: {
    marginVertical: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
