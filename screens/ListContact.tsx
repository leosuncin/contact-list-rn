import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DataTable, Paragraph, Surface } from 'react-native-paper';
import { Contact } from 'types';

const ListContact: React.FC = () => {
  const [state, setState] = useState<'loading' | 'list' | 'empty' | 'fail'>(
    'loading',
  );
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        );
        if (response.ok) {
          const json = (await response.json()) as Contact[];
          if (Array.isArray(json) && json.length > 0) {
            setState('list');
          } else {
            setState('empty');
          }
          setContacts(json);
        } else {
          setState('fail');
        }
      } catch (fail) {
        setState('fail');
        setError(fail.message);
      }
    })();
  }, []);

  return (
    <View style={[styles.screen, state !== 'list' && styles.center]}>
      {state === 'loading' && (
        <Surface style={styles.surface}>
          <Paragraph>Loading contacts</Paragraph>
        </Surface>
      )}
      {state === 'list' && (
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
      {state === 'empty' && (
        <Surface style={styles.surface}>
          <Paragraph>There isn't any contacts</Paragraph>
        </Surface>
      )}
      {state === 'fail' && (
        <Surface style={styles.surface}>
          <Paragraph>{error}</Paragraph>
        </Surface>
      )}
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
});
