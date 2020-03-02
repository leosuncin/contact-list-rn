import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Colors,
  DataTable,
  FAB,
  Paragraph,
  Surface,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'state/rootReducer';
import { selectContacts } from 'state/slices/contact';
import { fetchContacts } from 'state/slices/fetch';
import { RootStackParams } from 'types/RootStackParams';

type ListContactProps = {
  navigation: StackNavigationProp<RootStackParams, 'ListContact'>;
};

function Fetch() {
  const dispatch = useDispatch();

  return (
    <Surface style={styles.surface}>
      <Paragraph>There isn't any contacts</Paragraph>
      <Button onPress={() => dispatch(fetchContacts())}>
        Fetch some contacts
      </Button>
    </Surface>
  );
}
function Loading() {
  return (
    <Surface style={styles.surface}>
      <Paragraph>Loading contacts</Paragraph>
      <ActivityIndicator animating size="large" />
    </Surface>
  );
}
function Fail({ error }) {
  return (
    <Surface style={styles.surface}>
      <Paragraph>{error}</Paragraph>
    </Surface>
  );
}

const ListContact: React.FC<ListContactProps> = props => {
  const contacts = useSelector(selectContacts);
  const { state, error } = useSelector(
    (rootState: RootState) => rootState.fetch,
  );
  console.table(contacts);

  return (
    <View style={[styles.screen, contacts.length < 1 && styles.center]}>
      {contacts.length > 0 ? (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title numberOfLines={2}>Full name</DataTable.Title>
            <DataTable.Title>Username</DataTable.Title>
          </DataTable.Header>
          {contacts.map(contact => (
            <DataTable.Row
              key={contact.id}
              onPress={() => {
                props.navigation.navigate('ShowContact', { contact });
              }}
            >
              <DataTable.Cell>{contact.id}</DataTable.Cell>
              <DataTable.Cell>{contact.name}</DataTable.Cell>
              <DataTable.Cell>{contact.username}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      ) : (
        (state === 'ready' && <Fetch />) ||
        (state === 'loading' && <Loading />) ||
        (state === 'fail' && <Fail error={error} />)
      )}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => props.navigation.navigate('CreateContact')}
      />
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
