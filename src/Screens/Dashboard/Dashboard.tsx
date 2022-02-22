import React from "react";
import {Container, Header, UserInfo,Icon, Photo, User, UserGreeting,UserName, UserWrapper} from './DashboardStyle';
import {View} from "react-native";
import {HighlightCard} from "../../components/HighlightCard";


export function Dashboard(){
    return(
        <Container>
            <Header>
                <UserWrapper>
                <UserInfo>
                        <Photo source={{uri:"https://avatars.githubusercontent.com/u/81251211?v=4"}} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Gabriel</UserName>
                        </User>
                    </UserInfo>
                    <Icon name={'power'}/>
                </UserWrapper>
            </Header>
            <HighlightCard></HighlightCard>
        </Container>
    )
}
