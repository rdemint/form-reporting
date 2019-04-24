from django.core.management.base import BaseCommand, CommandError
from practices.models import DailySummary, Practice
from django.db.utils import IntegrityError
import csv
import os

'''
A command line utility to create DailySummaryobjects from CSV.
Example usage.... python manage.py carolina-health practice_summary_data.csv
Attempts to guard against empty csv file rows.
https://docs.djangoproject.com/en/2.2/howto/custom-management-commands/
'''

class Command(BaseCommand):
	help = "create DailySummary objects from csv file data.  The file must have column headers of Date, Visits, Workdays, Noshows"

	def add_arguments(self, parser):
		parser.add_argument('practice_slug', type=str)
		parser.add_argument('data_file', type=str)

	def handle(self, *args, **options):
		slug = options['practice_slug']
		file = options['data_file']
		total_created = 0
		total_skipped = 0
		duplicate_dates = []
		skipped_lines = []
		integrity_error = False
		print('')
			
		try: 
			practice = Practice.objects.get(slug=slug)
		except:
			raise CommandError('Practice with slug "%s" could not be found' % slug )

		with open(file, newline='',	encoding='utf-8-sig') as csvfile:
			reader = csv.reader(csvfile)

			for linenum, line in enumerate(reader):
				if linenum != 0:
					if line[0] != "":
						try:
							DailySummary.objects.create(practice=practice, 
								date=line[0], 
								visits=int(line[1]), 
								workdays=int(line[2]), 
								noshows=int(line[3])
								)
						except IntegrityError:
							integrity_error = True
							duplicate_dates.append(line[0]) 
							total_skipped += 1
							skipped_lines.append(line[0])
						except: 
							total_skipped += 1
							skipped_lines += 1
						else: 
							total_created+= 1
					else:
						total_skipped += 1
		print('{} File lines were skipped'.format(total_skipped))
		if integrity_error:
			print('File contained dates that already exist in the database')
			print('The following dates already exist: ')
			print(duplicate_dates)
		print('{} DailySummary objects were created'.format(total_created))