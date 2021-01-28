import { useLinkProps } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Button, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import firebase from '../database/firebase'

const UsersList = (props) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection('users').onSnapshot((querySnapshot) => {
            const users = [];

            querySnapshot.docs.forEach((doc) => {
                const {name, email, phone} = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                })
            });
            setUsers(users)
        });
    }, []);

    return (
    <ScrollView>
        <Button 
          title="CREATE USER"
          onPress={() => props.navigation.navigate('CreateUserScreen')}
        />

        {
            users.map(user => {
                return (
                    <ListItem key={user.id}>
                        <ListItem.Chevron/>
                        <Avatar
                            source={{uri: 
                            'https://img.icons8.com/officel/128/000000/avatar.png',
                        }}
                        rounded
                        />
                        <ListItem.Content>
                            <ListItem.Title>{user.name}</ListItem.Title>
                            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )
            })
        }
    </ScrollView>
    )
}


export default UsersList