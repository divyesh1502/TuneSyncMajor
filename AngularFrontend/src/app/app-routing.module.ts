
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/user/home/home.component';
import { ArtistDetailsComponent } from './components/user/artist-details/artist-details.component';
import { AddNewSongComponent } from './components/artist/add-new-song/add-new-song.component';
import { ArtistsComponent } from './components/user/artists/artists.component';
import { LikedSongsComponent } from './components/user/liked-songs/liked-songs.component';
import { CategoryComponent } from './components/user/category/category.component';
import { LibrarySectionComponent } from './components/user/library-section/library-section.component';
import { PlaylistItemComponent } from './components/user/playlist-item/playlist-item.component';
import { CreatePlaylistComponent } from './components/user/create-playlist/create-playlist.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { ArtistSectionComponent } from './components/admin/artist-section/artist-section.component';
import { ArtistDashboardComponent } from './components/artist/artist-dashboard/artist-dashboard.component';
import { SongAnalyticsComponent } from './components/artist/song-analytics/song-analytics.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { PlaylistMusicPlayerComponent } from './components/user/playlist-music-player/playlist-music-player.component';
import { LoginAuthService } from './services/login-auth.service';
import { AuthGuardService } from './services/auth-gaurd.service';
import { SearchComponent } from './components/user/search/search.component';
import { CategoryCardComponent } from './components/user/category-card/category-card.component';
import { HelpComponent } from './components/user/help/help.component';
import { UpdateProfileComponent } from './components/user/update-profile/update-profile.component';

 

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent, canActivate:[LoginAuthService]},
  {path:'artists/artist-details/:id', component: ArtistDetailsComponent, canActivate: [AuthGuardService]},
  {path:'add-new-song', component: AddNewSongComponent, canActivate: [AuthGuardService]},
  {path:'artists', component: ArtistsComponent},
  {path:'liked-songs', component: LikedSongsComponent, canActivate: [AuthGuardService]},
  {path:'categories', component: CategoryComponent},
  {path: 'library', component: LibrarySectionComponent, canActivate: [AuthGuardService]},
  {path: 'library/playlist/:id', component: PlaylistItemComponent, canActivate: [AuthGuardService]},
  {path: 'library/create-playlist', component: CreatePlaylistComponent, canActivate: [AuthGuardService]},
  {path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuardService]},
  {path: 'admin/artists', component: ArtistSectionComponent, canActivate: [AuthGuardService]},
  {path: 'artist/dashboard', component: ArtistDashboardComponent, canActivate: [AuthGuardService]},
  {path: 'artist/dashboard/song-analytics/:id', component: SongAnalyticsComponent, canActivate: [AuthGuardService]},
  {path:'home/play-music/:id', component: MusicPlayerComponent, canActivate: [AuthGuardService]},
  {path:'library/playlist/play-music/:id', component: PlaylistMusicPlayerComponent, canActivate: [AuthGuardService]},
  { path: "home/search", component: SearchComponent},
  {path:'categories/:categoryType', component: CategoryCardComponent},
  {path: 'help', component: HelpComponent},
  {path: 'settings', component: UpdateProfileComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
