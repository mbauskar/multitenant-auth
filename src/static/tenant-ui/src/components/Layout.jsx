import React from "react";
import { Link } from "react-router-dom";

const Layout = (props) => {
  const { username = "user" } = {};
  return (
    <div className="d-flex flex-row h-100">
      <div className="sidebar p-1 d-flex flex-column">
        <div className="p-2 d-flex flex-column align-items-center">
          <img
            src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='250px'%20height='150px'%20viewBox='0%200%20250%20150'%20version='1.1'%3e%3c!--%20Generator:%20Sketch%203.7.2%20(28276)%20-%20http://www.bohemiancoding.com/sketch%20--%3e%3ctitle%3eCL-logo-green-black-text-1000px%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cdefs/%3e%3cg%20id='Page-1'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='Artboard-33'%20transform='translate(-463.000000,%20-84.000000)'%3e%3cg%20id='CL-logo-green-black-text-1000px'%20transform='translate(463.000000,%2084.000000)'%3e%3cg%20id='Group-Copy-12'%20fill='%233BA341'%3e%3cg%20id='Group-2-Copy-12'%3e%3cpath%20d='M58.5118242,129.31713%20C43.3069659,114.353489%203.35013995,75.0248332%201.18644664,72.8355989%20C-1.48892975,70.1286414%200.713855363,65.7857786%204.28048434,65.7904764%20C6.60775528,65.7935418%2023.5425266,65.7973951%2030.7119015,65.7915868%20C37.8812764,65.7857786%2043.9863986,69.7822935%2046.1108702,71.778202%20C49.3006593,74.77496%2054.1668546,79.3466759%2058.0663306,83.010174%20C61.5865999,86.317413%2066.4642476,86.7461556%2070.0820794,83.1407204%20C89.1383239,64.1497726%20149.051502,4.45463549%20151.526777,2.14762686%20C154.685737,-0.796590991%20160.109445,-0.63400655%20162.85559,2.14762678%20C165.601735,4.92926011%20218.364928,56.5811978%20220.520361,58.7935847%20C223.164048,61.5071282%20220.769964,65.7857786%20217.740946,65.7904764%20C214.711929,65.7951742%20197.1761,65.7857786%20191.291806,65.7857786%20C190.901286,65.7857786%20190.510127,65.7740665%20190.119227,65.7513991%20C184.620113,65.4325182%20179.172385,62.9455573%20176.278822,60.3979599%20C174.379589,58.7258069%20167.630346,52.4604942%20162.688522,47.8593773%20C159.566065,44.9521941%20154.629718,45.295678%20152.037569,47.8059169%20C149.44542,50.3161558%2072.4168223,126.947584%2070.1292996,129.254381%20C67.438362,131.967993%2062.1075596,132.855821%2058.5118242,129.31713%20Z'%20id='Path-Copy-30'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e"
            alt="logo"
            class="banner-logo"
          />
          <div className="logo-title">Tenant</div>
        </div>
        <div className="sidebar-items">
          <div className="sidebar-item">Hello {username} !</div>
          {/* <Link to="/profile" className="sidebar-item sidebar-link">My Profile</Link> */}
          <Link to="/items" className="sidebar-item sidebar-link">
            Items
          </Link>
          <Link to="/users" className="sidebar-item sidebar-link">
            Users
          </Link>
          <a href="/api/user/logout" className="sidebar-item sidebar-link">
            Logout
          </a>
        </div>
      </div>
      <div className="main-content p-1" style={{ flex: 1 }}>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
