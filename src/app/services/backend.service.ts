import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as configs from '../../assets/configs.json';
import { AuthService } from './auth.service';

const unexpectedError = new Error('Please try again later.');

const customCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
};

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  public async getNoraTime(password: string): Promise<any> {
    await this.sleep(2);

    const endpoint = `${configs.api.address}/${configs.api.time}`;

    try {
      const response: any = await this.http
        .get(endpoint, { headers: { 'x-password': password } })
        .toPromise();

      if (!response || !response.time) {
        throw unexpectedError;
      }

      return response;
    } catch (err) {
      const customCode = this.getCustomCode(err);
      if (customCode === customCodes.UNAUTHORIZED) {
        this.auth.logout();
        throw new Error('Invalid Password.');
      }
      throw unexpectedError;
    }
  }

  public async getMemories(queries: { [key: string]: any }): Promise<any> {
    await this.sleep(2);

    const endpoint = `${configs.api.address}/${configs.api.memory}`;
    const password = this.auth.getPassword();

    try {
      const response: any = await this.http
        .get(endpoint, { headers: { 'x-password': password }, params: queries })
        .toPromise();

      if (!response || !response.data) {
        throw unexpectedError;
      }

      return response;
    } catch (err) {
      const customCode = this.getCustomCode(err);
      if (customCode === customCodes.UNAUTHORIZED) {
        this.auth.logout();
        throw new Error('Invalid Password.');
      }
      throw unexpectedError;
    }
  }

  public async createMemory(title: string, body: string): Promise<any> {
    await this.sleep(2);

    const endpoint = `${configs.api.address}/${configs.api.memory}`;
    const password = this.auth.getPassword();

    try {
      return await this.http
        .post(endpoint, { title, body }, { headers: { 'x-password': password } })
        .toPromise();
    } catch (err) {
      const customCode = this.getCustomCode(err);
      if (customCode === customCodes.UNAUTHORIZED) {
        this.auth.logout();
        throw new Error('Invalid Password.');
      }
      throw unexpectedError;
    }
  }

  private getCustomCode(err: HttpErrorResponse): string {
    const customCode = err.error && err.error.customCode;

    if (!customCode) {
      console.warn('No custom code in backend error.');
      throw unexpectedError;
    }
    return customCode;
  }

  private async sleep(sec: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
  }
}
