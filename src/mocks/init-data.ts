import { TCardProps } from "@/components/Card/Card.props"
import { TColumnProps } from "@/components/Column/Column.props"

export const columns: TColumnProps[] = [
    {
        id: '1',
        title: "Pre-Flight",
    },
    {
        id: '2',
        title: "Flight",
    },
    {
        id: '3',
        title: "Post-Flight",
    }
 ]

export const cards: TCardProps[] = [
    {
        id:'1',
        title: "Urban Traffic Analysis",
        description: "",
        status: 'pre-flight',
        columnId: '1'
    },
    {
        id:'2',
        title: "Medical Evacuation",
        description: "",
        status: 'pre-flight',
        columnId: '1'
    },
    {
        id:'3',
        title: "Wildlife Suiveillance",
        description: "sfsdfs sf dsfsdfsfdsdf",
        status: 'flight',
        columnId: '2'
    },
    {
        id:'4',
        title: "Urban Air Commute",
        description: "sdfsdf sdfsfsfds sfd",
        status: 'flight',
        columnId: '2'
    },
    {
        id:'5',
        title: "Search and Rescue",
        description: "fsdfsdf sf sfsfsfdf",
        status: 'flight',
        columnId: '2'
    },
    {
        id:'6',
        title: "Heritage Preservation",
        description: "sdfsfd sfsfsfsffdsf",
        status: 'post-flight',
        columnId: '3'
    },
    {
        id:'7',
        title: "Disaster Relief Transport",
        description: "sdfs sf sfs fsfsfsfs",
        status: 'post-flight',
        columnId: '3'
    }
]