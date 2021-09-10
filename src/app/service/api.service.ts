import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTrending(){
    return this.http.get<any[]>(`https://os-up.com/trending/all/day`).pipe(
      map((res: any) => {
        return  res.results
      }),
      // Sorting best movies --> worst
      map(results => {
        return results.sort((movie1, movie2) => movie2['vote_average'] - movie1['vote_average'])
      })
    )
  }

  getNowadaysMovies(){
    return this.http.get(`https://os-up.com/movie/now_playing`).pipe(
      map((res: any) => {
        return res.results;
      })
    )
  }

  getMovieDetails_old(id, type){
    return this.http.get(`https://os-up.com/${type}/${id}`)
  }

  getMovieCast(id, type){
    return this.http.get(`https://os-up.com/${type}/${id}/credits`).pipe(
      map((res:any) => res.cast)
    );
  }

  getActorDetails(id){
    return this.http.get(`https://os-up.com/person/${id}`)
  }

  getPopularActors(){
    return this.http.get(`https://os-up.com/person/popular`).pipe(
      map((res: any) => {
        return res.results;
      })
    )
  }

  getPopularMovies(){
    return this.http.get(`https://os-up.com/index.php?p=api&movie`).pipe(
      map((res: any) => {
        return res.results;
      })
    )
  }

  getMovies(page, limit){
    return this.http.get(`https://os-up.com/index.php?p=api&action=appgetmovies&page=${page}&linit=${limit}`).pipe(
      map((res: any) => {
        return res.results;
      })
    )
  }

  getMovieSearch(searchText){
    return this.http.get(`https://os-up.com/index.php?p=api&action=appgetmoviesearch&query=${searchText}`).pipe(
      map((res: any) => {
        return res.results;
      })
    )
  }



  getPornos(page, limit){
    return this.http.get(`https://os-up.com/index.php?p=api&action=appgetpornos&page=${page}&linit=${limit}`).pipe(
      map((res: any) => {
        return res.results;
      })
    )
  }

  getAnimes(page, limit){
    return this.http.get(`https://os-up.com/index.php?p=api&action=appgetanimes&page=${page}&linit=${limit}`).pipe(
      map((res: any) => {
        return res.results;
      })
    )
  }

  getSerien(page, limit){
    return this.http.get(`https://os-up.com/index.php?p=api&action=appgetserien&page=${page}&linit=${limit}`).pipe(
      map((res: any) => {
        return res.results;
      })
    )
  }


  getMovieDetails(id){
    return this.http.get(`https://os-up.com/index.php?p=api&action=appgetmovie&id=${id}`).pipe(
      map((res: any) => {
        return res;
      })
    )
  }
  getAnimeDetails(id){
    return this.http.get(`https://os-up.com/index.php?p=api&action=appgetmovie&id=${id}`).pipe(
      map((res: any) => {
        return res;
      })
    )
  }
  getPornoDetails(id){
    return this.http.get(`https://os-up.com/index.php?p=api&action=appgetmovie&id=${id}`).pipe(
      map((res: any) => {
        return res;
      })
    )
  }


  getPopularShows(){
    return this.http.get(`https://os-up.com/tv/top_rated`).pipe(
      map((res: any) => {
        return res.results;
      })
    )
  }

  getActorCreditList(id){
    return this.http.get(`https://os-up.com/person/${id}/combined_credits`).pipe(
      map((res:any) => res.cast),
      map(cast => {
        return cast.sort((a, b) => {
          const aValue = a['release_date'] || a['first_air_date'];
          const bValue = b['release_date'] || b['first_air_date'];

          let aDate = new Date(aValue);
          let bDate = new Date(bValue);
          return bDate.getTime() - aDate.getTime();
        })
      }),
      map(cast => {
        return cast.map(entry => {
          const value = entry['release_date'] || entry['first_air_date'];

          let date = new Date(value);
          entry.custom_year = date.getFullYear();
          return entry;
        })
      })
    )
  }
  getSearchResults(term) {
    return this.http.get(`https://os-up.com/search/multi`, {
      params: {
        query: term
      }
    }).pipe(
      map((res: any) => res.results),
      map(results => {
        return results.map(r => {
          if (r.poster_path) {
            r.imageUrl = `https://os-up.com/w200${r.poster_path}`;
          }
          return r;
        })
      })
    );
  }

}
