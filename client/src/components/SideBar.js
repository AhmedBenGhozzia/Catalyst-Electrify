import React, { Component } from 'react'

export default class SideBar extends Component {
  render() {
    return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link" href="index-2.html">
                            <i className="mdi mdi-home menu-icon" />
                            <span className="menu-title">Dashboard</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="pages/widgets/widgets.html">
                            <i className="mdi mdi-puzzle menu-icon" />
                            <span className="menu-title">Widgets</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                            <i className="mdi mdi-palette menu-icon" />
                            <span className="menu-title">UI Elements</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="ui-basic">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/accordions.html">Accordions</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/badges.html">Badges</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/breadcrumbs.html">Breadcrumbs</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/dropdowns.html">Dropdowns</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/modals.html">Modals</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/progress.html">Progress bar</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/pagination.html">Pagination</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/tabs.html">Tabs</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/tooltips.html">Tooltips</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#ui-advanced" aria-expanded="false" aria-controls="ui-advanced">
                            <i className="mdi mdi-layers menu-icon" />
                            <span className="menu-title">Advanced UI</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="ui-advanced">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/dragula.html">Dragula</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/clipboard.html">Clipboard</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/context-menu.html">Context menu</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/slider.html">Sliders</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/carousel.html">Carousel</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/colcade.html">Colcade</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/loaders.html">Loaders</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
                            <i className="mdi mdi-view-headline menu-icon" />
                            <span className="menu-title">Form elements</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="form-elements">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"><a className="nav-link" href="pages/forms/basic_elements.html">Basic Elements</a></li>
                                <li className="nav-item"><a className="nav-link" href="pages/forms/advanced_elements.html">Advanced Elements</a></li>
                                <li className="nav-item"><a className="nav-link" href="pages/forms/validation.html">Validation</a></li>
                                <li className="nav-item"><a className="nav-link" href="pages/forms/wizard.html">Wizard</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#editors" aria-expanded="false" aria-controls="editors">
                            <i className="mdi mdi-pencil-box-outline menu-icon" />
                            <span className="menu-title">Editors</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="editors">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"><a className="nav-link" href="pages/forms/text_editor.html">Text editors</a></li>
                                <li className="nav-item"><a className="nav-link" href="pages/forms/code_editor.html">Code editors</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
                            <i className="mdi mdi-chart-pie menu-icon" />
                            <span className="menu-title">Charts</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="charts">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/chartjs.html">ChartJs</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/morris.html">Morris</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/flot-chart.html">Flot</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/google-charts.html">Google charts</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/sparkline.html">Sparkline js</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/c3.html">C3 charts</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/chartist.html">Chartists</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/justGage.html">JustGage</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
                            <i className="mdi mdi-grid-large menu-icon" />
                            <span className="menu-title">Tables</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="tables">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/tables/basic-table.html">Basic table</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/tables/data-table.html">Data table</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/tables/js-grid.html">Js-grid</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/tables/sortable-table.html">Sortable table</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="pages/ui-features/popups.html">
                            <i className="mdi mdi-comment-alert menu-icon" />
                            <span className="menu-title">Popups</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="pages/ui-features/notifications.html">
                            <i className="mdi mdi-bell menu-icon" />
                            <span className="menu-title">Notifications</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
                            <i className="mdi mdi-emoticon menu-icon" />
                            <span className="menu-title">Icons</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="icons">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/icons/flag-icons.html">Flag icons</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/icons/mdi.html">Mdi icons</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/icons/font-awesome.html">Font Awesome</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/icons/simple-line-icon.html">Simple line icons</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/icons/themify.html">Themify icons</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#maps" aria-expanded="false" aria-controls="maps">
                            <i className="mdi mdi-map menu-icon" />
                            <span className="menu-title">Maps</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="maps">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/maps/mapael.html">Mapael</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/maps/vector-map.html">Vector Map</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/maps/google-maps.html">Google Map</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                            <i className="mdi mdi-account menu-icon" />
                            <span className="menu-title">User Pages</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="auth">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Login </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/login-2.html"> Login 2 </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/register.html"> Register </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/register-2.html"> Register 2 </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/lock-screen.html"> Lockscreen </a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#error" aria-expanded="false" aria-controls="error">
                            <i className="mdi mdi-alert-circle menu-icon" />
                            <span className="menu-title">Error pages</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="error">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
                            <i className="mdi mdi-file menu-icon" />
                            <span className="menu-title">General Pages</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="general-pages">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/blank-page.html"> Blank Page </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/profile.html"> Profile </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/faq.html"> FAQ </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/faq-2.html"> FAQ 2 </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/news-grid.html"> News grid </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/timeline.html"> Timeline </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/search-results.html"> Search Results </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/portfolio.html"> Portfolio </a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#e-commerce" aria-expanded="false" aria-controls="e-commerce">
                            <i className="mdi mdi-basket menu-icon" />
                            <span className="menu-title">E-commerce</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="e-commerce">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/invoice.html"> Invoice </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/pricing-table.html"> Pricing Table </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/orders.html"> Orders </a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="pages/apps/email.html">
                            <i className="mdi mdi-email menu-icon" />
                            <span className="menu-title">E-mail</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="pages/apps/calendar.html">
                            <i className="mdi mdi-calendar-range menu-icon" />
                            <span className="menu-title">Calendar</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="pages/apps/todo.html">
                            <i className="mdi mdi-playlist-check menu-icon" />
                            <span className="menu-title">Todo List</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="pages/apps/gallery.html">
                            <i className="mdi mdi-image menu-icon" />
                            <span className="menu-title">Gallery</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="pages/documentation/documentation.html">
                            <i className="mdi mdi-file-document-box-outline menu-icon" />
                            <span className="menu-title">Documentation</span>
                        </a>
                    </li>
                </ul>
            </nav>


    )
  }
}
