/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {Box, Grid, SimpleGrid} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import ComplexTable from "views/admin/default/components/ComplexTable";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";


import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar1 from "assets/img/avatars/amazonlogo.jpg";
import React from "react";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: "1fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
        }}
        gap={{ base: "10px", xl: "20px" }}>

          
        <Banner
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "1 / 3 / 2 / 4",
          }}
          banner={banner}
          avatar={avatar1}
          name='Amazon'
          job='Retailer'
          posts='5'
          followers='57k'
          following='27'
          minH='365px'
          minW='1000px'
          pe='20px'
        />
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        {/*<Notifications*/}
        {/*  gridArea={{*/}
        {/*    base: "3 / 1 / 4 / 2",*/}
        {/*    lg: "1 / 3 / 2 / 4",*/}
        {/*  }}*/}
        {/*/>*/}
      </Grid>
    </Box>
  );
}
