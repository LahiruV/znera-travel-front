import Navbar from '../../Components/NavBar/Navbar';
import TripNavbar from '../../Components/NavBar/TripNavBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import NewCardList from '../../Components/NewCardList';

const defaultTheme = createTheme();

const locations = [
  {
    id: 1,
    name: 'Jaffna',
    description: 'Jaffna is a city on the northern tip of Sri Lanka. Nallur Kandaswamy is a huge Hindu temple with golden arches and an ornate gopuram tower. By the coast, star-shaped Jaffna Fort was built by the Portuguese in the 17th century and later occupied by the Dutch and British.',
    image: 'https://images.unsplash.com/photo-1578161804288-59162292b136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // replace with actual image URL    
    places:[
      {
        name: 'Jaffna Fort',
        description: 'Jaffna Fort',
        image: 'https://images.unsplash.com/photo-1578161804288-59162292b136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Jaffna Fort',
        description: 'Jaffna Fort',
        image: 'https://images.unsplash.com/photo-1578161804288-59162292b136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Jaffna Fort',
        description: 'Jaffna Fort',
        image: 'https://images.unsplash.com/photo-1578161804288-59162292b136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Jaffna Fort',
        description: 'Jaffna Fort',
        image: 'https://images.unsplash.com/photo-1578161804288-59162292b136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ]
  },
  {
    id: 2,
    name: 'Kandy',
    description: 'Kandy is a large city in central Sri Lanka. Its set on a plateau surrounded by mountains, which are home to tea plantations and biodiverse rainforest. The citys heart is scenic Kandy Lake (Bogambara Lake), which is popular for strolling.. Kandy is famed for sacred Buddhist sites,',
    image: 'https://images.unsplash.com/photo-1566766188646-5d0310191714?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // replace with actual image URL    
    places:[
      {
        name: 'Jaffna Fort',
        description: 'Jaffna Fort',
        image: 'https://images.unsplash.com/photo-1578161804288-59162292b136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Jaffna Fort',
        description: 'Jaffna Fort',
        image: 'https://images.unsplash.com/photo-1578161804288-59162292b136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Jaffna Fort',
        description: 'Jaffna Fort',
        image: 'https://images.unsplash.com/photo-1578161804288-59162292b136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Jaffna Fort',
        description: 'Jaffna Fort',
        image: 'https://images.unsplash.com/photo-1578161804288-59162292b136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ]
  },
  {
    id: 3,
    name: 'Galle',
    description: 'Galle is a city on the southwest coast of Sri Lanka. It’s known for Galle Fort, the fortified old city founded by Portuguese colonists in the 16th century. Stone sea walls, expanded by the Dutch, encircle car-free streets with architecture reflecting Portuguese, Dutch and British rule.',
    image: 'https://images.unsplash.com/photo-1713038948592-5d070e8e8459?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // replace with actual image URL    
    places:[
      {
        name: 'Jaffna Fort',
        description: 'Jaffna Fort',
        image: 'https://images.unsplash.com/photo-1578161804288-59162292b136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Jaffna Fort',
        description: 'Jaffna Fort',
        image: 'https://images.unsplash.com/photo-1578161804288-59162292b136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Jaffna Fort',
        description: 'Jaffna Fort',
        image: 'https://images.unsplash.com/photo-1578161804288-59162292b136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Jaffna Fort',
        description: 'Jaffna Fort',
        image: 'https://images.unsplash.com/photo-1578161804288-59162292b136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ]
  },
];

export default function Location() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <TripNavbar />
      <Container>
       <NewCardList props={locations} />
      </Container>
    </ThemeProvider>
  );
}
