import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [countOrder, setCountOrder] = useState();
  const [countAcc, setCountAcc] = useState();
  const [countOrderInProgress, setCountOrderInProgress] = useState();
  const [countOrderAccepted, setCountOrderAccepted] = useState();
  const [countOrderPaid, setCountOrderPaid] = useState();
  const [countOrderEbookDeli, setCountOrderEbookDeli] = useState();
  const [countOrderPhysicalDeli, setCountOrderPhysicalDeli] = useState();
  const [countOrderDone, setCountOrderDone] = useState();
  const [countOrderCancel, setCountOrderCancel] = useState();
  const [topsellingPhy, setTopSellingPhy] = useState();
  const [phy1, setPhy1] = useState();
  const [phy2, setPhy2] = useState();
  const [phy3, setPhy3] = useState();
  const [phy4, setPhy4] = useState();
  const [phy5, setPhy5] = useState();
  const [phy6, setPhy6] = useState();
  const [phy7, setPhy7] = useState();
  const [phy8, setPhy8] = useState();
  const [phy9, setPhy9] = useState();
  const [phy10, setPhy10] = useState();

  const APIUrlCountOrder = "https://localhost:44301/api/orders/admin/count";
  const APIUrlCountAcc = "https://localhost:44301/api/accounts/count";
  const APIUrlCountOrderInProgress = "https://localhost:44301/api/orders/admin/count-order/in-progress";
  const APIUrlCountOrderAccepted = "https://localhost:44301/api/orders/admin/count-order/accepted";
  const APIUrlCountOrderPaid = "https://localhost:44301/api/orders/admin/count-order/paid";
  const APIUrlCountOrderEBookDeli = "https://localhost:44301/api/orders/admin/count-order/ebook-delivered";
  const APIUrlCountOrderPhysicalDeli = "https://localhost:44301/api/orders/admin/count-order/physical-delivered";
  const APIUrlCountOrderDone = "https://localhost:44301/api/orders/admin/count-order/done";
  const APIUrlCountOrderCancel = "https://localhost:44301/api/orders/admin/count-order/cancel";
  const APIURLTopSellingPhysicalBook = "https://localhost:44301/api/books/admin/dashboard/top-selling";

  useEffect(() => {
    fetch(APIUrlCountOrder)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((responseData) => {
        setCountOrder(responseData.data); 
      })
      fetch(APIUrlCountAcc)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((responseData) => {
        setCountAcc(responseData.data); 
      })
      fetch(APIUrlCountOrderDone)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((responseData) => {
        setCountOrderDone(responseData.data); 
      })
      fetch(APIUrlCountOrderCancel)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((responseData) => {
        setCountOrderCancel(responseData.data); 
      })

      fetch(APIUrlCountOrderInProgress)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((responseData) => {
        setCountOrderInProgress(responseData.data); 
      })
      fetch(APIUrlCountOrderAccepted)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((responseData) => {
        setCountOrderAccepted(responseData.data); 
      })
      fetch(APIUrlCountOrderPaid)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((responseData) => {
        setCountOrderPaid(responseData.data); 
      })
      fetch(APIUrlCountOrderPhysicalDeli)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((responseData) => {
        setCountOrderPhysicalDeli(responseData.data); 
      })
      fetch(APIUrlCountOrderEBookDeli)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((responseData) => {
        setCountOrderEbookDeli(responseData.data); 
      })
      fetch(APIURLTopSellingPhysicalBook)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData.data);
        setPhy1(responseData.data[0]); 
        setPhy2(responseData.data[1]);
        setPhy3(responseData.data[2]); 
        setPhy4(responseData.data[3]);
        setPhy5(responseData.data[4]); 
        setPhy6(responseData.data[5]);
        setPhy7(responseData.data[6]); 
        setPhy8(responseData.data[7]);
        setPhy9(responseData.data[8]); 
        setPhy10(responseData.data[9]);

      })
      
  }, [countOrder, countAcc, countOrderDone, countOrderCancel, countOrderInProgress, countOrderAccepted, countOrderPaid, countOrderPhysicalDeli, countOrderEbookDeli, phy1, phy2, phy3, phy4, phy5, phy6, phy7, phy8, phy9, phy10]);
  
  console.log(phy1);
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Customer Accounts" total={countAcc} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={countOrder} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Done Orders" total={countOrderDone} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Cancel Orders" total={countOrderCancel} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'In_Progress', value: countOrderInProgress != null ? countOrderInProgress : 0 },
                { label: 'Accepted', value: countOrderAccepted != null ? countOrderAccepted : 0},
                { label: 'Paid', value: countOrderPaid != null ? countOrderPaid : 0},
                { label: 'Ebook_delivered', value: countOrderEbookDeli != null ? countOrderEbookDeli : 0},
                { label: 'Physical_book_delivered', value: countOrderPhysicalDeli != null ? countOrderPhysicalDeli : 0 },
                { label: 'Done', value: countOrderDone != null ? countOrderDone : 0  },
                { label: 'Cancel', value: countOrderCancel != null ? countOrderCancel : 0},
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

            <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates
                  title="Top 10 Best Selling Physical Book"
                  subheader="(+43%) than last year"
                  chartData={[
                    phy1 != null ?{ label: phy1.name, value: phy1.amountSold } : "-",
                    phy2 != null ?{ label: phy2.name, value: phy2.amountSold} : "-",
                    phy3 != null ?{ label: phy3.name, value: phy3.amountSold }: "-",
                    phy4 != null ?{ label: phy4.name, value: phy4.amountSold }: "-",
                    phy5 != null ?{ label: phy5.name, value: phy5.amountSold }: "-",
                    phy6 != null ?{ label: phy6.name, value: phy6.amountSold}: "-",
                    phy7 != null ?{ label: phy7.name, value: phy7.amountSold }: "-",
                    phy8 != null ?{ label: phy8.name, value: phy8.amountSold }: "-",
                    phy9 != null ?{ label: phy9.name, value: phy9.amountSold }: "-",
                    phy10 != null ?{ label: phy10.name, value: phy10.amountSold}: "-",
                  ]
                }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
