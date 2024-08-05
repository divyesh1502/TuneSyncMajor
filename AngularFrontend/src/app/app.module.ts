import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { AddNewSongComponent } from './components/artist/add-new-song/add-new-song.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ArtistsComponent } from './components/user/artists/artists.component';
import { CategoryComponent } from './components/user/category/category.component';

import { CategoryCardComponent } from './components/user/category-card/category-card.component';
import { CreatePlaylistComponent } from './components/user/create-playlist/create-playlist.component';
import { LibrarySectionComponent } from './components/user/library-section/library-section.component';

import { CountCommasPipe } from './pipes/custom.pipe';

import { PlaylistItemComponent } from './components/user/playlist-item/playlist-item.component';
import { HomeComponent } from './components/user/home/home.component';
import { ArtistCardItemComponent } from './components/user/artist-card-item/artist-card-item.component';
import { ArtistDetailsComponent } from './components/user/artist-details/artist-details.component';
import { ArtistSongsComponent } from './components/user/artist-songs/artist-songs.component';
import { SongCardItemComponent } from './components/user/song-card-item/song-card-item.component';
import { LikedSongsComponent } from './components/user/liked-songs/liked-songs.component';
import { CreateFormComponent } from './components/user/create-playlist/create-form/create-form.component';
import { PlaylistComponent } from './components/user/library-section/playlist/playlist.component';
import { PlaylistDetailsComponent } from './components/user/playlist-item/playlist-details/playlist-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { CardBoxComponent } from './components/admin/admin-dashboard/card-box/card-box.component';
import { UserListComponent } from './components/admin/admin-dashboard/user-list/user-list.component';
import { ArtistSectionComponent } from './components/admin/artist-section/artist-section.component';
import { ArtistListComponent } from './components/admin/artist-section/artist-list/artist-list.component';
import { ArtistDashboardComponent } from './components/artist/artist-dashboard/artist-dashboard.component';
import { SongListComponent } from './components/artist/artist-dashboard/song-list/song-list.component';
import { ArtistCardBoxComponent } from './components/artist/artist-dashboard/artist-card-box/artist-card-box.component';
import { SongAnalyticsComponent } from './components/artist/song-analytics/song-analytics.component';
import { SongReviewSectionComponent } from './components/artist/song-analytics/song-review-section/song-review-section.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { MoreLikeThisComponent } from './components/music-player/more-like-this/more-like-this.component';
import { PlaylistMusicPlayerComponent } from './components/user/playlist-music-player/playlist-music-player.component';
import { UserSongReviewComponent } from './components/user/user-song-review/user-song-review.component';
import { PopularSongsComponent } from './components/user/home/popular-songs/popular-songs.component';
import { TopArtistsComponent } from './components/user/home/top-artists/top-artists.component';
import { TopRatedSongsComponent } from './components/user/home/top-rated-songs/top-rated-songs.component';
import { SearchComponent } from './components/user/search/search.component';
import { HelpComponent } from './components/user/help/help.component';
import { UpdateProfileComponent } from './components/user/update-profile/update-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PopularSongsComponent,
    TopArtistsComponent,
    TopRatedSongsComponent,
    AddNewSongComponent,
    ArtistCardItemComponent,
    ArtistDetailsComponent,
    ArtistSongsComponent,
    SideBarComponent,
    SongCardItemComponent,
    TopBarComponent,
    AddNewSongComponent,
    ArtistsComponent,
    CategoryComponent,
    CategoryCardComponent,
    CreatePlaylistComponent,
    LibrarySectionComponent,
    LikedSongsComponent,
    CountCommasPipe,
    CreateFormComponent,
    PlaylistComponent,
    PlaylistItemComponent,
    PlaylistDetailsComponent,
    CreatePlaylistComponent,
    CreateFormComponent,
    CountCommasPipe,
    AdminDashboardComponent,
    CardBoxComponent,
    UserListComponent,
    ArtistSectionComponent,
    ArtistListComponent,
    ArtistDashboardComponent,
    SongListComponent,
    ArtistCardBoxComponent,
    SongAnalyticsComponent,
    SongReviewSectionComponent,
    MusicPlayerComponent,
    MoreLikeThisComponent,
    PlaylistMusicPlayerComponent,
    UserSongReviewComponent,
    SearchComponent,
    HelpComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
