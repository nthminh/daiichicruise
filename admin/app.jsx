/* DAIICHI BACK OFFICE — app router by role */
const { useState: aUseState } = React;

function BackOfficeApp() {
  const [role, setRole] = aUseState(null);
  const [view, setView] = aUseState('dash');

  if (!role) return <RoleLogin onPick={(r) => { setRole(r); setView(r === 'manager' ? 'dash' : r === 'staff' ? 'pos' : r === 'agent' ? 'portal' : 'ptportal'); }} />;

  const menus = {
    manager: [
      { id: 'dash', lb: 'Tổng quan', Icon: BI.dash },
      { id: 'bookings', lb: 'Quản lý booking', Icon: BI.ticket },
      { id: 'trips', lb: 'Chuyến & sơ đồ ghế', Icon: BI.seat },
      { id: 'pricing', lb: 'Giá & khuyến mãi', Icon: BI.tag },
      { id: 'cms', lb: 'Nội dung (CMS)', Icon: BI.dash },
      { id: 'cruise_mgr', lb: '🚢 Quản lý Tàu & Giá (Live Sync)', Icon: BI.tag, href: 'cruise-manager.html' },
      { id: 'reports', lb: 'Báo cáo & đối soát', Icon: BI.chart },
      { id: 'agents', lb: 'Đại lý & công nợ', Icon: BI.users },
      { id: 'tiers', lb: 'Hạng & xếp hạng đại lý', Icon: BI.tag },
      { id: 'partners', lb: 'Đối tác vận hành', Icon: BI.ship || BI.users },
      { sep: 'Vận hành đội xe/tàu' },
      { id: 'dispatch', lb: 'Bảng điều độ', Icon: BI.seat },
      { id: 'segments', lb: 'Bán ghế theo chặng', Icon: BI.ticket },
      { id: 'weather', lb: 'Cấm biển — xử lý loạt', Icon: BI.chart },
      { id: 'fleet', lb: 'Đăng kiểm & bảo dưỡng', Icon: BI.pos },
      { id: 'pnl', lb: 'Lãi – lỗ theo chuyến', Icon: BI.wallet },
      { sep: 'Nội bộ' },
      { id: 'payroll', lb: 'Chấm công & lương (tổng quan)', Icon: BI.wallet },
      { id: 'staff', lb: 'Hồ sơ nhân sự', Icon: BI.users },
      { id: 'timesheet', lb: 'Bảng công tháng', Icon: BI.check },
      { id: 'salary', lb: 'Tính lương', Icon: BI.wallet },
      { id: 'training', lb: 'Đào tạo & an toàn', Icon: BI.check },
      { id: 'seasonal', lb: 'Tuyển dụng thời vụ', Icon: BI.users },
      { id: 'shifts', lb: 'Xếp ca tuần', Icon: BI.seat },
      { id: 'kpi', lb: 'KPI & chia tip', Icon: BI.chart },
      { id: 'offboard', lb: 'Nghỉ việc (offboard)', Icon: BI.out },
      { id: 'users', lb: 'Người dùng & quyền', Icon: BI.users },
      { id: 'audit', lb: 'Nhật ký (audit)', Icon: BI.chart },
      { sep: 'Bán hàng' },
      { id: 'pos', lb: 'POS quầy vé', Icon: BI.pos },
      { id: 'checkin', lb: 'Soát vé / check-in', Icon: BI.check },
    ],
    staff: [
      { id: 'pos', lb: 'POS bán vé', Icon: BI.pos },
      { id: 'checkin', lb: 'Soát vé / check-in', Icon: BI.check },
      { id: 'trips', lb: 'Sơ đồ ghế chuyến', Icon: BI.seat },
    ],
    agent: [
      { id: 'portal', lb: 'Đặt chỗ & công nợ', Icon: BI.wallet },
    ],
    partner: [
      { id: 'ptportal', lb: 'Dịch vụ & doanh thu', Icon: BI.wallet },
    ],
  };

  const VIEWS = {
    dash: DashView, bookings: BookingsView, trips: TripsView, pricing: PricingView,
    reports: ReportsView, agents: AgentsView, partners: PartnersView, pos: POSView, checkin: CheckinView, portal: AgentPortal, ptportal: PartnerPortal,
    payroll: PayrollView, users: UsersView, audit: AuditView, cms: CMSView,
    dispatch: DispatchView, segments: SegmentsView, weather: WeatherOpsView, fleet: FleetView, pnl: PnLView, tiers: TiersView,
    staff: StaffView, timesheet: TimesheetView, salary: SalaryView,
    training: TrainingView, seasonal: SeasonalView, shifts: ShiftView, kpi: KpiView, offboard: OffboardView,
  };
  const View = VIEWS[view] || DashView;

  return (
    <Shell role={role} menu={menus[role]} view={view} setView={setView} onLogout={() => setRole(null)}>
      <View />
    </Shell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BackOfficeApp />);
