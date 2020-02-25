import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Colors,
  DataTable,
  FAB,
  Paragraph,
  Surface,
  ActivityIndicator,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'state/rootReducer';
import { selectContacts } from 'state/slices/contact';
import { fetchContacts } from 'state/slices/fetch';

const ListContact: React.FC = () => {
  const contacts = useSelector(selectContacts);
  const { state, error } = useSelector(
    (rootState: RootState) => rootState.fetch,
  );
  const dispatch = useDispatch();

  return (
    <View style={[styles.screen, state !== 'loaded' && styles.center]}>
      {state === 'ready' && contacts.length < 1 && (
        <Surface style={styles.surface}>
          <Paragraph>There isn't any contacts</Paragraph>
          <Button onPress={() => dispatch(fetchContacts())}>
            Load some contacts
          </Button>
        </Surface>
      )}
      {state === 'loading' && (
        <Surface style={styles.surface}>
          <Paragraph>Loading contacts</Paragraph>
          <ActivityIndicator animating size="large" />
        </Surface>
      )}
      {state === 'loaded' && (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title numberOfLines={2}>Full name</DataTable.Title>
            <DataTable.Title>Username</DataTable.Title>
          </DataTable.Header>
          {contacts.map(contact => (
            <DataTable.Row key={contact.id}>
              <DataTable.Cell>{contact.id}</DataTable.Cell>
              <DataTable.Cell>{contact.name}</DataTable.Cell>
              <DataTable.Cell>{contact.username}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      )}
      {state === 'fail' && (
        <Surface style={styles.surface}>
          <Paragraph>{error}</Paragraph>
        </Surface>
      )}
      <FAB icon="plus" style={styles.fab} />
    </View>
  );
};

export default ListContact;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  surface: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.green400,
  },
});
