import { Button, Card, Text } from 'react-native-paper';

const BasicsCard = () => (
  <Card elevation={20} style={{ margin: 10, borderRadius: 10, backgroundColor: '#fdf7ef', height: 180, paddingTop: 25 }}>
    <Card.Title
      title="New to Investment ?"
      subtitle="Start exploring world of investments"
    />
    <Card.Actions style={{ justifyContent: 'flex-start', paddingLeft: 7, paddingTop: 20 }}>
      <Button style={{ backgroundColor: '#7e8052' }}><Text style={{color: '#fff'}}>Explore</Text></Button>
    </Card.Actions>
  </Card>
);

export default BasicsCard;