![Image](https://github.com/user-attachments/assets/41ddb301-0e83-4594-9706-9727cbae9dd7)

### [프로젝트 소개]

- **목적**: 외국인들이 병원에 방문할 때, 사용 가능한 언어 정보를 제공하여 더 나은 의료 서비스를 받을 수 있도록 돕는 웹사이트 개발
- **주요 기능**:
    - **병원 리스트 페이지**: 서울시 강남구와 강동구의 병원 정보를 제공하며, 병원별 사용 언어, 병원명, 주소, 진료과목을 확인할 수 있음
    - **상세 페이지**: 병원의 세부 정보를 제공하며, 병원별 사용 언어, 병원명, 주소, 진료과목을 상세히 보여줌
    - **진료 예약 기능**: 외국인 사용자가 진료 예약을 할 수 있는 기능 제공
    - **병원명 검색 기능**: 병원 이름을 검색하여 원하는 병원을 쉽게 찾을 수 있음
    - **필터링 기능** (추가 예정): '언어', '거리 순', '진료과목', '지역', '영업 중 여부'에 따른 병원 검색 필터링 기능 제공
    - **회원 관련 기능** (추가 예정): 리뷰, 즐겨찾기, 마이페이지 기능 추가 예정
    - **영어 버전 웹사이트** (추가 예정): 외국인을 위한 영어 버전 웹사이트 제공 예정

### [SQL 관련 화면과 코드]

- **기능**: 강동구와 강남구의 병원 정보를 30개씩 조회, ‘병원 더보기’ 버튼 클릭하면, offset 15씩 증가시킴

![Image](https://github.com/user-attachments/assets/024367f6-b4fd-4010-b8c0-4b0ff2dfdacb)


```java
String sql = 
						"(SELECT gangdong_name AS hospital_name, "
						+ "gangdong_languages AS hospital_languages, "
						+ "gangdong_main_address AS hospital_main_address, "
						+ "SUBSTRING_INDEX(gangdong_category, ',', 1) AS hospital_main_category, "
						+ "'gangdong' AS source, "
						+ "id AS hospital_id "
						+ "FROM gangdong_hospital "
						+ "ORDER BY hospital_id ASC "
						+ "LIMIT 15 OFFSET :OFFSET) "
						+ "UNION "
						+ "(SELECT gangnam_name AS hospital_name, "
						+ "gangnam_languages AS hospital_languages, "
						+ "gangnam_main_address AS hospital_main_address, "
						+ "SUBSTRING_INDEX(gangnam_category, ',', 1) AS hospital_main_category, "
						+ "'gangnam' AS source, "
						+ "id AS hospital_id "
						+ "FROM gangnam_hospital "
						+ "ORDER BY hospital_id ASC "
						+ "LIMIT 15 OFFSET :OFFSET);"
				;
			Query query = em.createNativeQuery(sql, Tuple.class);
			query.setParameter("OFFSET", offsetNum);
		
			List<Tuple> rs = query.getResultList();
			
			List<Map<String, Object>> rsToMap = JPAUtil.convertTupleToMap(rs);
			return rsToMap;
```

- **기능**: 병원 상세 페이지 (병원명, 주소, 가능 언어, 진료과목 등 )

![Image](https://github.com/user-attachments/assets/017ccd59-0ade-46dc-8457-32e4f41dfeb0)

![Image](https://github.com/user-attachments/assets/0ee6d3fe-e18f-4e4d-a70c-d4b147de8e18)

![Image](https://github.com/user-attachments/assets/8112a413-c4fa-4b4a-9596-818ebb2d0d3b)

 source를 기준으로 gangnam_hospital 또는 gangdong_hospital에서 SELECT

```java

	String sql = "SELECT gangnam_name AS hospital_name, "
					+ "gangnam_phone_number AS hospital_phone_number, "
					+ "gangnam_languages AS hospital_languages, "
					+ "gangnam_main_address AS hospital_main_address, "
					+ "gangnam_address AS hospital_address, "
					+ "gangnam_category AS hospital_category "
					+ "FROM gangnam_hospital WHERE ID = :ID";;
			Query query = em.createNativeQuery(sql, Tuple.class);
			query.setParameter("ID", hospitalId);
		
			List<Tuple> rs = query.getResultList();
			
			List<Map<String, Object>> rsToMap = JPAUtil.convertTupleToMap(rs);
			return rsToMap;
```

```java
String sql = "SELECT gangdong_name AS hospital_name, "
					+ "gangdong_phone_number AS hospital_phone_number, "
					+ "gangdong_languages AS hospital_languages, "
					+ "gangdong_main_address AS hospital_main_address, "
					+ "gangdong_address AS hospital_address, "
					+ "gangdong_category AS hospital_category "
					+ "FROM gangdong_hospital WHERE ID = :ID";
			
			
			Query query = em.createNativeQuery(sql, Tuple.class);
			query.setParameter("ID", hospitalId);
		
			List<Tuple> rs = query.getResultList();
			
			List<Map<String, Object>> rsToMap = JPAUtil.convertTupleToMap(rs);
			return rsToMap;
```

- **기능**: 병원 진료 예약 페이지(진료 날짜와 시간, 희망 언어, 증상/과목 등)

![Image](https://github.com/user-attachments/assets/ce86e516-d1ab-4f6e-863e-eacb3edfb21a)

![Image](https://github.com/user-attachments/assets/6f3425f2-4100-45b5-96d0-552990db1b40)

![Image](https://github.com/user-attachments/assets/aa5ac807-c635-48bb-b500-692c427d9791)

![Image](https://github.com/user-attachments/assets/dfe6375a-77fb-4810-bebf-3cf2a6106fac)


- **기능**: 병원명 검색

![Image](https://github.com/user-attachments/assets/20b71346-8be8-4688-b867-a6548f3c294d)

```java
String sql = "(SELECT gangdong_name AS hospital_name, "
						+ "gangdong_languages AS hospital_languages, "
						+ "gangdong_main_address AS hospital_main_address, "
						+ "SUBSTRING_INDEX(gangdong_category, ',', 1) AS hospital_main_category, "
						+ "'gangdong' AS source, "
						+ "id AS hospital_id "
						+"FROM gangdong_hospital "
						+"WHERE gangdong_name LIKE CONCAT('%', :hospital_name, '%') "
						+ "ORDER BY id ASC "
						+ "LIMIT 15 OFFSET :OFFSET) "
						+ "UNION "
						+"(SELECT gangnam_name AS hospital_name, "
						+ "gangnam_languages AS hospital_languages, "
						+ "gangnam_main_address AS hospital_main_address, "
						+ "SUBSTRING_INDEX(gangnam_category, ',', 1) AS hospital_main_category, "
						+ "'gangnam' AS source, "
						+ "id AS hospital_id "
						+"FROM gangnam_hospital "
						+"WHERE gangnam_name LIKE CONCAT('%', :hospital_name, '%') "
						+ "ORDER BY id ASC "
						+ "LIMIT 15 OFFSET :OFFSET) "
						;
						
			Query query = em.createNativeQuery(sql, Tuple.class);
			query.setParameter("hospital_name", hospitalName);
			query.setParameter("OFFSET", offsetNum);
		
			List<Tuple> rs = query.getResultList();
			
			List<Map<String, Object>> rsToMap = JPAUtil.convertTupleToMap(rs);
			return rsToMap;
```

### [사용 기술]

- **백엔드**: Java(Spring Boot), MySQL
- **프론트엔드**: React, TypeScript, Ant Design Components

### [역할]

- **전체 프로젝트 설계 및 개발**: 백엔드, 프론트엔드, 디자인 및 기획을 포함한 전반적인 프로젝트 개발
- **백엔드 개발**: 데이터베이스 설계, Spring Boot 기반 서버 구축
- **프론트엔드 개발**: 사용자 인터페이스(UI) 구현, 병원 정보와 검색 기능 등 구현
- **기획 및 디자인**: 직관적이고 사용하기 쉬운 UI/UX 설계, 공공데이터 CSV 파일을 받아 필요한 데이터를 테이블에 삽입하여 시스템 설계

### [기술적 도전]

- **영어 버전 웹사이트 개발**: 외국인을 위해 웹사이트의 영어 버전 추가 예정
    - 영어 버전에서는 사용자가 영어로 검색할 수 있기 때문에, 데이터베이스 정보도 영어로 바꾸거나 다국어로 처리하는 부분이 도전 과제가 될 예정

### [성과]

- **웹사이트 개발 중**: 병원 정보, 예약 시스템 및 다국어 지원 기능을 갖춘 웹사이트를 개발 중
- **공공데이터 활용**: CSV 데이터를 기반으로 병원 정보 테이블을 설계 및 구현
- **UI/UX 설계**: 사용자가 직관적으로 병원 정보를 찾고 예약할 수 있는 웹사이트의 기본 구조 완성
